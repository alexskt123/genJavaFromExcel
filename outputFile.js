fs = require('fs')
const distinct = require('distinct')
var os = require("os")
const { titleCase } = require('title-case')
const {pascalCase} = require('change-case')
const config = require('./config')

const outputEntityFile = (distinctWorkStreamList, distinctTableList, tableFieldList) => {

    const fileHeader = `package org.life.entity;

    import java.util.Date;
    import java.util.List;
    import java.util.Set;
    import java.util.UUID;
    
    import javax.persistence.CascadeType;
    import javax.persistence.Column;
    import javax.persistence.Entity;
    import javax.persistence.FetchType;
    import javax.persistence.JoinColumn;
    import javax.persistence.ManyToMany;
    import javax.persistence.ManyToOne;
    import javax.persistence.NamedAttributeNode;
    import javax.persistence.NamedEntityGraph;
    import javax.persistence.NamedQuery;
    import javax.persistence.OneToMany;
    import javax.persistence.OneToOne;
    import javax.persistence.Table;
    import javax.persistence.Temporal;
    import javax.persistence.TemporalType;
    
    import org.hibernate.annotations.LazyCollection;
    import org.hibernate.annotations.LazyCollectionOption;
    import org.hibernate.annotations.NotFound;
    import org.hibernate.annotations.NotFoundAction;
    
    import com.fasterxml.jackson.annotation.JsonIgnore;
    
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;
    `

    distinctWorkStreamList.forEach(workStream => {
        const curTablesWithWorkStream = distinct(tableFieldList.filter(x => x.workStream === workStream).map(x => x.table))
        distinctTableList.filter(x => curTablesWithWorkStream.includes(x)).forEach(t => {

            const fileName = `${config.outputPath}${workStream}/entity/${t}.java`

            const fieldStringList = tableFieldList.filter(x => x.table === t).map(x => {
                const fieldString = `\t@Column(name = "${x.column}")${os.EOL}\tprivate ${x.type} ${x.field};${os.EOL}`
                return fieldString
            }).join(os.EOL)

            const getterList = tableFieldList.filter(x => x.table === t).map(x => {
                const fieldString = genGetter(x.type, x.field)
                return fieldString
            }).join(os.EOL)

            const fileContent = `${fileHeader}${os.EOL}public class ${t} extends BaseEntityUuid {${os.EOL}${fieldStringList}${os.EOL}${getterList}${os.EOL}} ${os.EOL}`
            
            fs.writeFile(fileName, fileContent, function (err) {
                if (err) return console.log(err);
            });
        })
    })
}

const getFunctionInput = (i) => {
    return i.includes('request') ? `${i.split(':')[1]} request` : `${i.split(':')[0]} ${i.split(':')[1]}`
}

const genGetter = (type, varName) => {
    const template = type.includes('List<') ? `    public ${type} get${pascalCase(varName)}(){
        return ${varName};
    }` : ''

    return template
}

const outputControllerFile = (distinctWorkStreamList, functionList, distinctTableList) => {
    distinctWorkStreamList.forEach(workStream => {        

        const fileName = `${config.outputPath}${workStream}/controller/${titleCase(workStream)}Controller.java`

        //const importEntity = distinctTableList.map(d => `    import org.life.${workStream}.entity.${d};`).join(os.EOL)

        const fileHeader = `    package org.life.controller.${workStream};
    
        import java.util.List;
        import javax.servlet.http.HttpServletResponse;
        import org.life.dto.BaseResponse;    
        import org.life.${workStream}.service.${titleCase(workStream)}Service;
        import org.springframework.beans.factory.annotation.Autowired;
        import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
        
        import org.springframework.web.bind.annotation.GetMapping;
        import org.springframework.web.bind.annotation.PostMapping;
        import org.springframework.web.bind.annotation.RequestBody;
        import org.springframework.web.bind.annotation.RequestParam;
        import org.springframework.web.bind.annotation.RestController;
        import javax.naming.directory.SearchControls;
        import javax.naming.ldap.LdapContext;
        
        import org.springframework.beans.factory.annotation.Value;
        import java.util.logging.Logger;
        import org.life.BaseException;
        import org.life.db.LifePageRequest;
        import org.life.dto.SrchIndRequest;
        
        @RestController
        public class ${titleCase(workStream)}Controller implements ${titleCase(workStream)}ControllerInterface {
            
            @Autowired
            private ${titleCase(workStream)}Service ${workStream}Service;
    
    `

        const functionStringList = functionList.filter(x => x.workStream === workStream).map(x => {
            const inputTemplate = x.input.split(',').map(i => {
                const input = i.includes('request') ? `${x.method === "Post" ? '@RequestBody ' : ''} ${getFunctionInput(i)}` : `@RequestParam ${getFunctionInput(i)}`
                return input
            }).join(', ')

            const functionTemplate = `\t@${x.method}Mapping(value="/${x.name}", produces=APPLICATION_JSON_VALUE)
            @Override
            public ${x.output} ${x.name} (
                    ${inputTemplate}
                    , HttpServletResponse response
            ) throws BaseException {
            }${os.EOL}`

            return functionTemplate
        }).join(os.EOL)

        const fileTailer = "    }"

        fs.writeFile(fileName, `${fileHeader}${functionStringList}${fileTailer}`, function (err) {
            if (err) return console.log(err);
        });
    })
}

const outputServiceFile = (distinctWorkStreamList, functionList, distinctTableList) => {
    distinctWorkStreamList.forEach(workStream => {

        const fileName = `${config.outputPath}${workStream}/service/${titleCase(workStream)}Service.java`

        //const importEntity = distinctTableList.map(d => `   import org.life.${workStream}.entity.${d};`).join(os.EOL)

        const fileHeader = `
       package org.life.${workStream}.service;
       
       import org.life.BaseException;
       import org.life.dto.BaseResponse;
       import org.springframework.data.domain.Page;
       import org.springframework.data.domain.PageRequest;
       
       public interface ${titleCase(workStream)}Service {
    
`

        const functionStringList = functionList.filter(x => x.workStream === workStream).map(x => {
            const inputTemplate = x.input.split(',').map(i => {
                const input = getFunctionInput(i)
                return input
            }).join(', ')

            const functionTemplate = `\t\tpublic ${x.output} ${x.name}(${inputTemplate}) throws BaseException;${os.EOL}`

            return functionTemplate
        }).join(os.EOL)

        const fileTailer = "\t}"

        fs.writeFile(fileName, `${fileHeader}${functionStringList}${fileTailer}`, function (err) {
            if (err) return console.log(err);
        });
    })
}

module.exports = {
    outputEntityFile,
    outputControllerFile,
    outputServiceFile
}

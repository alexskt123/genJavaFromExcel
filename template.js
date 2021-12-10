const { titleCase } = require("title-case");

const entityFileHeader = `package org.life.entity;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
`;

const controllerFileHeader = (workStream) => {
    return `    package org.life.controller.${workStream};
    
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

`;
};

const serviceFileHeader = (workStream) => {
    return `
    package org.life.${workStream}.service;
    
    import org.life.BaseException;
    import org.life.dto.BaseResponse;
    import org.springframework.data.domain.Page;
    import org.springframework.data.domain.PageRequest;
    
    public interface ${titleCase(workStream)}Service {
 
`;
};

module.exports = {
    entityFileHeader,
    controllerFileHeader,
    serviceFileHeader
};

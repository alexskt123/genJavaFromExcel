const config = {
  functionInput: {
    distinctWorkStreamList: ['Fruit'],
    functionList: [
      {
        workStream: 'Fruit',
        name: 'getFruits',
        input: 'String:fruit_cd',
        output: 'List<Apple>',
        method: 'getFruits',
        logic: ['fdafds', 'fdafdsf'],
        transactional: 'yes',
        crossService: ['Cook', 'Chef'],
        subFunctions: ['getApple', 'getOrange'],
      },
    ],
    jsonObj: [
      {
        'UF Mapping': '',
        Workstream: 'Fruit',
        Microservice: 'Fruit',
        'EndPoint?': 'yes',
        'Transactional?': 'yes',
        'Common Function name': 'getFruits',
        Description: 'Get Fruits!',
        'Input fields': 'String:fruit_cd',
        Logic: '- fdafds\n- fdafdsf',
        'Cross Service': '- Cook\n- Chef',
        SQL: '',
        'Related Tables / Event Broker Topics': '',
        'Output filed': 'List<Apple>',
        'Sub-Function': 'getApple\ngetOrange',
      },
    ],
  },
  functionOutput: {
    controllerFile: [
      {
        fileName: './output/org/life/Fruit/controller/FruitController.java',
        fileContent:
          '    package org.life.controller.Fruit;\n' +
          '    \n' +
          '    import java.util.List;\n' +
          '    import javax.servlet.http.HttpServletResponse;\n' +
          '    import org.life.dto.BaseResponse;    \n' +
          '    import org.life.Fruit.service.FruitService;\n' +
          '    import org.springframework.beans.factory.annotation.Autowired;\n' +
          '    import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;\n' +
          '    \n' +
          '    import org.springframework.web.bind.annotation.GetMapping;\n' +
          '    import org.springframework.web.bind.annotation.PostMapping;\n' +
          '    import org.springframework.web.bind.annotation.RequestBody;\n' +
          '    import org.springframework.web.bind.annotation.RequestParam;\n' +
          '    import org.springframework.web.bind.annotation.RestController;\n' +
          '    import javax.naming.directory.SearchControls;\n' +
          '    import javax.naming.ldap.LdapContext;\n' +
          '    \n' +
          '    import org.springframework.beans.factory.annotation.Value;\n' +
          '    import java.util.logging.Logger;\n' +
          '    import org.life.BaseException;\n' +
          '    import org.life.db.LifePageRequest;\n' +
          '    import org.life.dto.SrchIndRequest;\n' +
          '    \n' +
          '    @RestController\n' +
          '    public class FruitController implements FruitControllerInterface {\n' +
          '        \n' +
          '        @Autowired\n' +
          '        private FruitService FruitService;\n' +
          '\n' +
          '\t@getFruitsMapping(value="/getFruits", produces=APPLICATION_JSON_VALUE)\n' +
          '              @Override\n' +
          '              public List<Apple> getFruits (\n' +
          '                      @RequestParam String fruit_cd                    \n' +
          '              ) throws BaseException {\n' +
          '              }\r\n' +
          '    }',
      },
    ],
    serviceFile: [
      {
        fileName: './output/org/life/Fruit/service/FruitService.java',
        fileContent:
          'package org.life.service;\n' +
          '\n' +
          'import java.text.ParseException;\n' +
          'import java.util.List;\n' +
          'import java.util.Map;\n' +
          'import java.util.Optional;\n' +
          'import java.util.UUID;\n' +
          '\n' +
          'import com.fasterxml.jackson.core.JsonProcessingException;\n' +
          'import com.fasterxml.jackson.databind.JsonMappingException;\n' +
          '\n' +
          'public interface FruitService {\n' +
          '\n' +
          '\t@Transactional\r\n' +
          '\tpublic List<Apple> getFruits(String fruit_cd) {\r\n' +
          '\t\t//Please be reminded that this function will have a cross service for: Cook\r\n' +
          '\r\n' +
          '\t\t//Please be reminded that this function will have a cross service for: Chef\r\n' +
          '\r\n' +
          '\t\t//Sub-functions:\r\n' +
          '\t\t//getApple\r\n' +
          '\t\t//getOrange\r\n' +
          '\r\n' +
          '\t\t//TO-DO: fdafds\r\n' +
          '\r\n' +
          '\t\t//TO-DO: fdafdsf\r\n' +
          '\t}\r\n' +
          '}',
      },
    ],
    serviceImplFile: [
      {
        fileName: './output/org/life/Fruit/service/FruitServiceImpl.java',
        fileContent:
          'package org.life.service.impl;\n' +
          '\n' +
          'import java.math.BigDecimal;\n' +
          'import java.math.RoundingMode;\n' +
          'import java.text.ParseException;\n' +
          'import java.text.SimpleDateFormat;\n' +
          'import java.util.ArrayList;\n' +
          'import java.util.Calendar;\n' +
          'import java.util.Date;\n' +
          'import java.util.HashMap;\n' +
          'import java.util.List;\n' +
          'import java.util.Map;\n' +
          'import java.util.Set;\n' +
          'import java.util.UUID;\n' +
          'import java.util.stream.Collectors;\n' +
          '\n' +
          'import org.life.service.FruitService;\n' +
          '\n' +
          'import org.springframework.beans.factory.annotation.Autowired;\n' +
          'import org.springframework.data.domain.Page;\n' +
          'import org.springframework.data.domain.PageRequest;\n' +
          'import org.springframework.data.domain.Pageable;\n' +
          'import org.springframework.data.domain.Sort;\n' +
          'import org.springframework.stereotype.Service;\n' +
          'import org.springframework.transaction.annotation.Transactional;\n' +
          '\n' +
          'import com.fasterxml.jackson.core.JsonProcessingException;\n' +
          'import com.fasterxml.jackson.core.type.TypeReference;\n' +
          'import com.fasterxml.jackson.databind.DeserializationFeature;\n' +
          'import com.fasterxml.jackson.databind.JsonMappingException;\n' +
          'import com.fasterxml.jackson.databind.ObjectMapper;\n' +
          '\n' +
          'public class FruitServiceImpl implements FruitService {\n' +
          '\n' +
          '\tpublic List<Apple> getFruits(String fruit_cd) {\r\n' +
          '\t}\r\n' +
          '}',
      },
    ],
  },
  entityInput: {
    distinctWorkStreamList: ['Fruit'],
    distinctTableList: ['Apple', 'Orange'],
    tableFieldList: [
      {
        workStream: 'Fruit',
        table: 'Apple',
        column: 'ORANGE',
        field: 'orange',
        type: 'List<Orange>',
      },
      {
        workStream: 'Fruit',
        table: 'Apple',
        column: 'FRUIT_CD',
        field: 'fruitCd',
        type: 'UUID',
      },
      {
        workStream: 'Fruit',
        table: 'Orange',
        column: 'FRUIT_CD',
        field: 'fruitCd',
        type: 'UUID',
      },
      {
        workStream: 'Fruit',
        table: 'Orange',
        column: 'AMT',
        field: 'amt',
        type: 'BigDecimal',
      },
    ],
    jsonObj: [
      {
        Workstream: 'Fruit',
        'Table Name': 'Apple',
        'Field Name': 'orange',
        'Data Type': 'List<Orange>',
      },
      {
        Workstream: 'Fruit',
        'Table Name': 'Apple',
        'Field Name': 'fruit_cd',
        'Data Type': 'Raw',
      },
      {
        Workstream: 'Fruit',
        'Table Name': 'Orange',
        'Field Name': 'fruit_cd',
        'Data Type': 'Raw',
      },
      {
        Workstream: 'Fruit',
        'Table Name': 'Orange',
        'Field Name': 'amt',
        'Data Type': 'BigDecimal',
      },
    ],
  },
  entityOutput: [
    {
      fileName: './output/org/life/Fruit/entity/Apple.java',
      fileContent:
        'package org.life.entity;\n' +
        '\n' +
        'import java.util.Date;\n' +
        'import java.util.List;\n' +
        'import java.util.Set;\n' +
        'import java.util.UUID;\n' +
        '\n' +
        'import javax.persistence.CascadeType;\n' +
        'import javax.persistence.Column;\n' +
        'import javax.persistence.Entity;\n' +
        'import javax.persistence.FetchType;\n' +
        'import javax.persistence.JoinColumn;\n' +
        'import javax.persistence.ManyToMany;\n' +
        'import javax.persistence.ManyToOne;\n' +
        'import javax.persistence.NamedAttributeNode;\n' +
        'import javax.persistence.NamedEntityGraph;\n' +
        'import javax.persistence.NamedQuery;\n' +
        'import javax.persistence.OneToMany;\n' +
        'import javax.persistence.OneToOne;\n' +
        'import javax.persistence.Table;\n' +
        'import javax.persistence.Temporal;\n' +
        'import javax.persistence.TemporalType;\n' +
        '\n' +
        'import org.hibernate.annotations.LazyCollection;\n' +
        'import org.hibernate.annotations.LazyCollectionOption;\n' +
        'import org.hibernate.annotations.NotFound;\n' +
        'import org.hibernate.annotations.NotFoundAction;\n' +
        '\n' +
        'import com.fasterxml.jackson.annotation.JsonIgnore;\n' +
        '\n' +
        'import lombok.AllArgsConstructor;\n' +
        'import lombok.Builder;\n' +
        'import lombok.Data;\n' +
        'import lombok.NoArgsConstructor;\n' +
        '\r\n' +
        'public class Apple extends BaseEntityUuid {\r\n' +
        '\t@Column(name = "ORANGE")\r\n' +
        '\tprivate Orange[] orange;\r\n' +
        '\r\n' +
        '\t@Column(name = "FRUIT_CD")\r\n' +
        '\tprivate UUID fruitCd;\r\n' +
        '\r\n' +
        '} \r\n',
    },
    {
      fileName: './output/org/life/Fruit/entity/Orange.java',
      fileContent:
        'package org.life.entity;\n' +
        '\n' +
        'import java.util.Date;\n' +
        'import java.util.List;\n' +
        'import java.util.Set;\n' +
        'import java.util.UUID;\n' +
        '\n' +
        'import javax.persistence.CascadeType;\n' +
        'import javax.persistence.Column;\n' +
        'import javax.persistence.Entity;\n' +
        'import javax.persistence.FetchType;\n' +
        'import javax.persistence.JoinColumn;\n' +
        'import javax.persistence.ManyToMany;\n' +
        'import javax.persistence.ManyToOne;\n' +
        'import javax.persistence.NamedAttributeNode;\n' +
        'import javax.persistence.NamedEntityGraph;\n' +
        'import javax.persistence.NamedQuery;\n' +
        'import javax.persistence.OneToMany;\n' +
        'import javax.persistence.OneToOne;\n' +
        'import javax.persistence.Table;\n' +
        'import javax.persistence.Temporal;\n' +
        'import javax.persistence.TemporalType;\n' +
        '\n' +
        'import org.hibernate.annotations.LazyCollection;\n' +
        'import org.hibernate.annotations.LazyCollectionOption;\n' +
        'import org.hibernate.annotations.NotFound;\n' +
        'import org.hibernate.annotations.NotFoundAction;\n' +
        '\n' +
        'import com.fasterxml.jackson.annotation.JsonIgnore;\n' +
        '\n' +
        'import lombok.AllArgsConstructor;\n' +
        'import lombok.Builder;\n' +
        'import lombok.Data;\n' +
        'import lombok.NoArgsConstructor;\n' +
        '\r\n' +
        'public class Orange extends BaseEntityUuid {\r\n' +
        '\t@Column(name = "FRUIT_CD")\r\n' +
        '\tprivate UUID fruitCd;\r\n' +
        '\r\n' +
        '\t@Column(name = "AMT")\r\n' +
        '\tprivate BigDecimal amt;\r\n' +
        '\r\n' +
        '} \r\n',
    },
  ],
};

module.exports = {
  config,
};

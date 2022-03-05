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
  },
  functionOutput: [
    {
      fileName: './output/org/life/Fruit/service/FruitService.java',
      fileContent:
        'package org.life.Fruit.service;\n' +
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

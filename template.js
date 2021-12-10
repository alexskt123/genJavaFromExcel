const { titleCase } = require("title-case");

const entityFileHeader = {
    sad: `package org.life.entity;

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
`,
    code: `package org.life.entity.vo;
    
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
@NoArgsConstructor`
};

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
    return {
        sad: `package org.life.${workStream}.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

public interface ${titleCase(workStream)}Service {

`,
code : `package org.life.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

public interface ${titleCase(workStream)}Service {

`
    };
};

const serviceImplFileHeader = (workStream) => {
    return `package org.life.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.life.service.${titleCase(workStream)}Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ${titleCase(workStream)}ServiceImpl implements ${titleCase(workStream)}Service {

`;
};

module.exports = {
    entityFileHeader,
    controllerFileHeader,
    serviceFileHeader,
    serviceImplFileHeader
};

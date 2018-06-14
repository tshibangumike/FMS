if (typeof (fms) == "undefined") {
    fms = {};
};

fms.Model = {
    Deceased: {
        Fields: [
            { Name: "firstname", DisplayName: "First Name", IsDisabled: false, IsRequired: true, IsVisible: true },
            { Name: "lastname", DisplayName: "Last Name", IsDisabled: false, IsRequired: true, IsVisible: true },
            { Name: "saidnumber", DisplayName: "ID Number", IsDisabled: false, IsRequired: true, IsVisible: true },
            { Name: "dateofbirth", DisplayName: "Date of Birth", IsDisabled: false, IsRequired: true, IsVisible: true },
            { Name: "genderid", DisplayName: "Gender Id", IsDisabled: false, IsRequired: true, IsVisible: true },
            { Name: "contactnumber", DisplayName: "Contact Number", IsDisabled: false, IsRequired: false, IsVisible: false },
            { Name: "emailaddress", DisplayName: "Email Address", IsDisabled: false, IsRequired: false, IsVisible: false },
            { Name: "addressid", DisplayName: "Address", IsDisabled: false, IsRequired: false, IsVisible: true },
            { Name: "dateofdeath", DisplayName: "Date of Death", IsDisabled: false, IsRequired: true, IsVisible: true },
            { Name: "placeofdeath", DisplayName: "Place of Death", IsDisabled: false, IsRequired: false, IsVisible: true },
            { Name: "wherewasthebodyretrievedfrom", DisplayName: "Where Was the Body Retrieved From", IsDisabled: false, IsRequired: false, IsVisible: true },
            { Name: "causeofdeath", DisplayName: "Cause of Death", IsDisabled: false, IsRequired: true, IsVisible: true }
        ]
    },
    Informant: {
        Fields: [
            { Name: "firstname", DisplayName: "First Name", IsDisabled: false, IsRequired: false, IsVisible: true },
            { Name: "lastname", DisplayName: "Last Name", IsDisabled: false, IsRequired: false, IsVisible: true },
            { Name: "saidnumber", DisplayName: "ID Number", IsDisabled: false, IsRequired: false, IsVisible: true },
            { Name: "dateofbirth", DisplayName: "Date of Birth", IsDisabled: false, IsRequired: false, IsVisible: false },
            { Name: "genderid", DisplayName: "Gender Id", IsDisabled: false, IsRequired: true, IsVisible: true },
            { Name: "contactnumber", DisplayName: "Contact Number", IsDisabled: false, IsRequired: false, IsVisible: true },
            { Name: "emailaddress", DisplayName: "Email Address", IsDisabled: false, IsRequired: false, IsVisible: true }
        ]
    },
};

fms.Fields = {
    GetFieldByModelByName: function (modelName, fieldName) {
        var field = null;
        switch (modelName.toLowerCase()) {
        case _.lowerCase(fms.Entity.Deceased.EntityName):
            field = _.find(fms.Model.Deceased.Fields, function(x) { return _.isEqual(x.Name, fieldName); });
        case _.lowerCase(fms.Entity.Informant.EntityName):
                field = _.find(fms.Model.Informant.Fields, function(x) { return _.isEqual(x.Name, fieldName); });
        default:
        }
        return field;
    },
    SetFieldRequirementLevel: function(modelName, fieldName, isRequired) {
        var field = null;
        switch (_.lowerCase(modelName)) {
        case _.lowerCase(fms.Entity.Deceased.EntityName):
            field = _.find(fms.Model.Deceased.Fields, function(x) { return _.isEqual(x.Name, fieldName); });
            break;
        case _.lowerCase(fms.Entity.Informant.EntityName):
            field = _.find(fms.Model.Deceased.Fields, function(x) { return _.isEqual(x.Name, fieldName); });
            break;
        default:
        }
        if (field == null) return;
        field.IsRequired = isRequired;
    },
    SetFieldDisableState: function(modelName, fieldName, isDisabled) {
        switch (_.lowerCase(modelName)) {
        case fms.Entity.Deceased:
            var field = _.find(fms.Model.Deceased.Fields, function(x) { return _.isEqual(x.Name, fieldName); });
            if (_.isNull(field)) return;
            field.IsDisabled = isDisabled;
        default:
        }
        return;
    },
    SetFieldVisibility: function(modelName, fieldName, isVisible) {
        switch (_.lowerCase(modelName)) {
        case fms.Entity.Deceased:
            var field = _.find(fms.Model.Deceased.Fields, function(x) { return _.isEqual(x.Name, fieldName); });
            if (_.isNull(field)) return;
            field.IsVisible = isVisible;
        default:
        }
        return;
    },
    SetFieldValue: function(modelName, model, fieldName, value) {
        switch (_.lowerCase(modelName)) {
        case fms.Entity.Deceased:
            var field = _.find(fms.Model.Deceased.Fields, function(x) { return _.isEqual(x.Name, fieldName); });
            if (_.isNull(model) || _.isNull(field) || _.isNull(value)) return;
            model[fieldName] = value;
        default:
        }
        return;
    },
    ClearFieldValue: function(modelName, model, fieldName) {
        switch (_.lowerCase(modelName)) {
        case fms.Entity.Deceased:
            var field = _.find(fms.Model.Deceased.Fields, function(x) { return _.isEqual(x.Name, fieldName); });
            if (_.isNull(model) || _.isNull(field) || _.isNull(value)) return;
            model[fieldName] = null;
        default:
        }
        return;
    }
};
const Validator = require("validator");
const isEmpty = require("../validation/is-empty")

module.exports = function validateProfileInput(data) {
  let errors = {};
// set to an empty string if its empty, IsEmpty checks undefined, null and so forth
  data.handle = !isEmpty(data.handle) ? data.handle : '';

if(!Validator.isLength(data.handle, {min:2 , max: 50})){
    errors.handle = "handle needs to between 2 and 4 characters"
}
// handle is required
if(Validator.isEmpty(data.handle)){
    errors.handle = "Profile handle is required"
}
// personal websites and socail media url's not required but validation in place to check correct url
if(!isEmpty(data.website)){
    if(!Validator.isURL(data.website)){
        errors.website = "Not a valid URL";
    }
}

if(!isEmpty(data.soundcloud)){
    if(!Validator.isURL(data.soundcloud)){
        errors.soundcloud = "Not a valid URL";
    }
}

if(!isEmpty(data.youtube)){
    if(!Validator.isURL(data.youtube)){
        errors.youtube = "Not a valid URL";
    }
}
if(!isEmpty(data.twitter)){
    if(!Validator.isURL(data.twitter)){
        errors.twitter = "Not a valid URL";
    }
}
if(!isEmpty(data.facebook)){
    if(!Validator.isURL(data.facebook)){
        errors.facebook = "Not a valid URL";
    }
}
if(!isEmpty(data.instagram)){
    if(!Validator.isURL(data.instagram)){
        errors.instagram = "Not a valid URL";
    }
}

  return {
    errors,
    // isValid if errors are empty
    isValid: isEmpty(errors)
  };
};
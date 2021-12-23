const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error")

const LawCaseFile = require("../models/LawFileCaseInfo-model")




const FileCasesInfolawyercases = async (req, res, next) => {
  

  const {Tehsil,Address,PartyName,caseName } = req.body;
    console.log(Tehsil,Address,PartyName,caseName );

  const accepted = new LawCaseFile ({
    Tehsil,
    Address,
    PartyName,
    caseName
   
  });

  accepted.save().then(savedData => {
    console.log(savedData);
    res.status(201).json({ place: savedData });
  })
    .catch(err => {
      const error = new HttpError(
        'Creating case failed, please try again.',
        500
      );
      return next(error);
    });
};
const getInfoFilecase = (req, res) => {
    LawCaseFile.find().then(dataL => {
      res.status(200).send({
          dataL
          
      });
      console.log(dataL)
  }).catch(err => {
      res.status(500).json(err);
      console.log(err)
  });
};




module.exports={FileCasesInfolawyercases,getInfoFilecase}
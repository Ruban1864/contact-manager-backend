const express = require("express");
const router = express.Router();

const {getContact,
    createContact,
    getContacts,
    updateContact,
    deleteContact,
} =  require("../controllers/contactController");
//const { route } = require("./userRoute");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
module.exports = router;
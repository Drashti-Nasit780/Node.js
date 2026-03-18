const Admin = require('../model/admin.model');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

exports.addAdminPage = async (req, res) => {
    try {
        return res.render("admin/addAdmin");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.addAdmin = async (req, res) => {
    try {
        let imgPath = req.file ? `/uploads/${req.file.filename}` : "";
        let hashPass = await bcrypt.hash(req.body.password, 10);

        await Admin.create({
            ...req.body,
            password: hashPass,
            profileimg: imgPath
        });

        return res.redirect("/admin/view-admin");
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

exports.viewAllAdmin = async (req, res) => {
    try {
        let admins = await Admin.find();
        return res.render("admin/viewAdmin", { admins });
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
}

exports.deleteAdmin = async (req, res) => {
    let id = req.params.id;
    let admin = await Admin.findById(id);

    if (!admin) {
        console.log("Admin not found..");
        return res.redirect('/');
    }

    if (admin.profileimg != "") {
        let imgpath = path.join(__dirname, "..", admin.profileimg);
        try {
            fs.unlinkSync(imgpath);
        } catch (error) {
            console.log('Something is missing');
        }
    }

    await Admin.findByIdAndDelete(id);
    return res.redirect('/admin/view-admin');
}

exports.editAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        return res.render('admin/editAdmin', { admin });
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await Admin.findById(id);

        if (!admin) {
            console.log("Admin not found");
            return res.redirect('/admin/view-admin');
        }

        const updateData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            gender: req.body.gender,
            mobileNo: req.body.mobileNo
        };

        if (req.file) {
            if (admin.profileimg) {
                const imgPath = path.join(__dirname, "..", admin.profileimg);
                try {
                    fs.unlinkSync(imgPath);
                } catch (err) {
                    console.log(err);
                }
            }

            updateData.profileimg = `/uploads/${req.file.filename}`;
        }

        if (req.body.password?.trim()) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }

        await Admin.findByIdAndUpdate(id, updateData, { new: true });

        return res.redirect('/admin/view-admin');

    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};
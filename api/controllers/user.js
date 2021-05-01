'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
const nodemailer = require("nodemailer");

var User = require('../models/user');
const { response } = require('../app');

function getUser(req, res){
    var userId = req.params.id;
    
    User.findById(userId, (err, user) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if (!user) {
                res.status(404).send({message: 'El usuario no existe'});
            }else{
                res.status(200).send({user});
            }
        }
    });
}

function saveUser(req, res){
    var user = new User();
    
    var params = req.body;
    user.name = params.name;
    user.last_name = params.last_name;
    user.email = params.email;
    user.phone = params.phone;
    user.company_name = params.company_name;
    user.company_address = params.company_address;
    user.seller_data = params.seller_data;
    user.engineerring_data = params.engineerring_data;

    user.save((err, userStored) =>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!userStored){
                res.status(404).send({message: 'Error al guardar usuario'});
            }else{
                res.status(200).send({user: userStored});
            }
        }
    });
}

function sendMailer(req, res){
    var params  = req.body;
    let to = params.email;
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        post: 465,
        secure: true,
        auth: {
            user: "000999zzz44@gmail.com",
            pass: 'ovgkzbqptsjzhkec'
        }
    });

    var mailOptions = {
        from: "000999zzz44@gmail.com",
        to: to,
        subject: 'Gracias por registrarte',
        html: bodyEmail()
    };

    transporter.sendMail(mailOptions, (err, info) =>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!info){
                res.status(404).send({message: 'Error al envial email'});
            }else{
                res.status(200).send({userEmail: to});
            }
        }
    });

}

function bodyEmail(){
    var body =`
    <div style="background-color:#f6f6f6">
        <div style="Margin:0 auto;min-width:320px;max-width:580px;word-wrap:break-word;word-break:break-word;background-color:transparent">
            <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                <div style="min-width:320px;max-width:580px;display:table-cell;vertical-align:top;width:580px">
                    <div style="background-color:#ffffff;width:100%!important">
                        <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:20px;padding-bottom:20px;padding-right:0px;padding-left:0px">
                            <div style="color:#000000;font-family:'Trebuchet MS','Lucida Grande','Lucida Sans Unicode','Lucida Sans',Tahoma,sans-serif;line-height:1.2;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px">
                                <div style="font-size:14px;line-height:1.2;color:#000000;font-family:'Trebuchet MS','Lucida Grande','Lucida Sans Unicode','Lucida Sans',Tahoma,sans-serif">
                                    <p style="font-size:22px;line-height:1.2;word-break:break-word;text-align:center;margin:0">
                                        <span style="font-size:22px">
                                            <span style="color:#02bc4d">Gracias por registrarte</span>
                                        </span>
                                    </p>
                                </div>
                                <div style="font-size:14px;line-height:1.2;font-family:'Trebuchet MS','Lucida Grande','Lucida Sans Unicode','Lucida Sans',Tahoma,sans-serif;color:#000000">
                                    <p style="font-size:16px;line-height:1.2;word-break:break-word;text-align:center;font-family:'Trebuchet MS','Lucida Grande','Lucida Sans Unicode','Lucida Sans',Tahoma,sans-serif;margin:0">
                                        <span style="font-size:16px">
                                            Gracias por registrarte para continuar con el proceso y culminar por favor da clic en el siguiente boton.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="background-color:#f6f6f6">
        <div style="Margin:0 auto;min-width:320px;max-width:580px;word-wrap:break-word;word-break:break-word;background-color:transparent">
            <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                <div style="min-width:320px;max-width:580px;display:table-cell;vertical-align:top;width:580px">
                    <div style="width:100%!important">
                        <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:20px;padding-bottom:20px;padding-right:0px;padding-left:0px">

                            <center>
                                <p style="font-family:'Open Sans',sans-serif;font-size:16px;Margin:0;Margin-bottom:10px">
                                    <a href="http://localhost:4200/agradecimiento" style="font-weight:bold;display:inline-block;background-color:#44d462;color:#ffffff;padding-top:20px;padding-bottom:20px;padding-right:40px;padding-left:40px;margin-top:20px;margin-bottom:20px;margin-right:20px;margin-left:20px;border-radius:50px;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://email.emailmagneto365.com/c/eJxVjkEKgzAURE8Tdw0__yexLrKQiteQxEQNaBS19fqN0E1hFsPAPJ43WPlQ2SIaBBSAIAVBblxwVcpGtLUiXYoXtRWTEBYb58WOKZwracX7dSkmg9RL52gA7aDyKvTktCSFVkgPmkQxm-k8t4NRzbDNua6L_1PyeMQxPd4bo_Zje5vOLnpGDT5BI0M5dL9D3qDYzRyiD_seUhjtHJNfs9142920LzIlQFg&amp;source=gmail&amp;ust=1612589142755000&amp;usg=AFQjCNEErL-Xl4Ej9DJ7HOOCX5ByOznidw">
                                        Finalizar Registro
                                    </a>
                                </p>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return body;
}

module.exports = {
    getUser,
    saveUser,
    sendMailer
}
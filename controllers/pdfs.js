const user=require('../data/user');
const profile=require('../data/profile');
const details=require('../data/details');
const forms=require('../data/forms');
const fs=require('fs');
const path=require('path');
const PDFDocument=require('pdfkit');

const download=(req,res,next)=>{
    forms.find()
        .then(obj=>{
            res.render('forms/form',{tit:'forms',obj:obj,isAuthenticated:req.session.loggedIn});
        })
        .catch(err=>{console.log(45,err,78);});
    
} 

const formsDownload=(req,res,next)=>{
    id=req.params.orderId;
    forms.findById(id)
        .then(obj=>{
            invoicePath=path.join(__dirname,'../','data','Invoices','2.png');
            console.log(34,invoicePath,78);
            const doc = new PDFDocument();
            doc.pipe(res);
            doc.image(invoicePath, { fit: [400, 600],
                                align: 'center',
                                valign: 'center' } );
            doc.end();
            res.setHeader('Content-Type','application/pdf');
            res.setHeader('Content-Disposition','attachment;filename="' + 'checked.pdf' + '"');
        })
        .catch(err=>{console.log(5,err,7);});
}


module.exports={
    download:download,
    formsDownload:formsDownload
}

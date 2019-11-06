const user=require('../data/user');
const profile=require('../data/profile');
const details=require('../data/details');
const path=require('path');
const PDFDocument=require('pdfkit');
// const date=new Date();

const getWithdraw=(req,res,next)=>{
    res.render('functions/withdraw',{tit:'withdraw_money',message:false,isAuthenticated:req.session.loggedIn})
}


const postWithdraw=(req,res,next)=>{
password=+req.body.password;
amount=+req.body.amount;
accountNumber=+req.body.accountNumber;
if (password===req.logUser.password & accountNumber===req.logUser.accountNumber){
    user.findOne({accountNumber:accountNumber})
        .then(user1=>{
            if (amount<=0){
                res.render('functions/withdraw',{tit:'lt_than_0',message:'Enter valid amount',isAuthenticated:req.session.loggedIn});
            }
            else if(user1.amount>=amount){
                user1.amount=user1.amount-amount;
                li=Date().split(" ");
                const details=[...user1.details,{message:'withdraw',withdraw:amount,check:-1,amountLeft:user1.amount,
                                date:`Time :${li[4]} , Date :${li[1]}/${li[2]}/${li[3]}`}];
                user1.details=details;
                user2=new user(user1);
                user2.save()
                    .then(a=>{
                        console.log(65,'successful withdraw',94);
                        console.log(56,Date().split(" "),8);
                        res.redirect('/');
                    })
                    .catch(err=>{console.log(76,err,5);});
            }
            else{
                res.render('functions/withdraw',{tit:'gt_than_0',message:'Not enough money',isAuthenticated:req.session.loggedIn});
            }     
        })
        .catch(err=>{console.log(45,err,7);});   
}
else{
    res.render('functions/withdraw',{tit:'wrong_info',message:'Enter correct details of yourself',isAuthenticated:req.session.loggedIn});
    }
}


const getTransfer=(req,res,next)=>{
    res.render('functions/transfer',{tit:'transfer_money',message:false,isAuthenticated:req.session.loggedIn})
}

const postTransfer=(req,res,next)=>{
password=+req.body.password;
amount=+req.body.amount;
yourAccountNumber=+req.body.yourAccountNumber;
receiverAccountNumber=+req.body.receiverAccountNumber;
console.log(56,password,amount,yourAccountNumber,receiverAccountNumber,38);
if (password===req.logUser.password & yourAccountNumber===req.logUser.accountNumber){
    user.findOne({accountNumber:yourAccountNumber})
        .then(user1=>{
            user.findOne({accountNumber:receiverAccountNumber})
                .then(user2=>{
                    if(user2){         
                        if (amount<=0){
                            res.render('functions/transfer',{tit:'lt_than_0',message:'Enter valid amount',isAuthenticated:req.session.loggedIn});
                        }
                        else if(user1.amount>=amount){
                            user1.amount=user1.amount-amount;
                            li=Date().split(" ");
                            const details=[...user1.details,{message:`transferred to ${user2.accountNumber}`,
                                            account:user2.accountNumber,transfer:amount,check:2,amountLeft:user1.amount,
                                            date:`Time :${li[4]} , Date :${li[1]}/${li[2]}/${li[3]}`}];
                            user1.details=details;
                            user11=new user(user1);
                            user11.save()
                                .then(a=>{
                                    console.log(87,'successful transferred',76);
                                    user2.amount=user2.amount+amount;
                                    const details=[...user2.details,{message:`received by ${user1.accountNumber}`,account:user1.accountNumber,transfer:amount,check:-2,amountLeft:user2.amount,date:`Time :${li[4]} , Date :${li[1]}/${li[2]}/${li[3]}`}];
                                    user2.details=details;
                                    user22=new user(user2);
                                    user22.save()
                                        .then(b=>{
                                            console.log(76,'received',89); 
                                            res.redirect('/');
                                        })
                                        .catch(err=>{console.log(19,err,57);});
                                })
                                .catch(err=>{console.log(9,err,53);});
                        }
                        else{
                            res.render('functions/transfer',{tit:'gt_than_0',message:'Not enough money',isAuthenticated:req.session.loggedIn});
                        }
                    }
                    else{
                        res.render('functions/transfer',{tit:'wrong_info',message:'Enter correct details of the receiver',isAuthenticated:req.session.loggedIn});
                    }  
                })
                .catch(err=>{console.log(798,err,58);});
        })
        .catch(err=>{console.log(45,err,7);});   
}
else{
    res.render('functions/transfer',{tit:'wrong_info',message:'Enter correct details of yourself',isAuthenticated:req.session.loggedIn});
}
}

const getDeposit=(req,res,next)=>{
    res.render('functions/deposit',{tit:'deposit_money',message:false,isAuthenticated:req.session.loggedIn})
}

const postDeposit=(req,res,next)=>{
    password=+req.body.password;
    amount=+req.body.amount;
    accountNumber=+req.body.accountNumber;
    if (password===req.logUser.password & accountNumber===req.logUser.accountNumber){
        user.findOne({accountNumber:accountNumber})
            .then(user1=>{
                if (amount<=0){
                    res.render('functions/deposit',{tit:'lt_than_0',message:'Enter valid amount',isAuthenticated:req.session.loggedIn});
                }
                else{
                    user1.amount=user1.amount+amount;
                    li=Date().split(" ");
                    const details=[...user1.details,{message:'deposit',deposit:amount,check:1,amountLeft:user1.amount,
                                    date:`Time :${li[4]} , Date :${li[1]}/${li[2]}/${li[3]}`}];
                    user1.details=details;
                    user2=new user(user1);
                    user2.save()
                        .then(a=>{
                            console.log(65,'successful deposit',94);
                            res.redirect('/');
                        })
                        .catch(err=>{console.log(76,err,5);});
                }    
            })
            .catch(err=>{console.log(45,err,7);});   
    }
    else{
        res.render('functions/deposit',{tit:'wrong_info',message:'Enter correct details of the user',isAuthenticated:req.session.loggedIn});
    }
}


const checkBalance=(req,res,next)=>{
    res.render('functions/checkBalance',{tit:'balance',amount:req.logUser.amount,isAuthenticated:req.session.loggedIn});
}


const allDetails=(req,res,next)=>{
    res.render('functions/details',{tit:'details',details:req.logUser.details,amount:req.logUser.amount,isAuthenticated:req.session.loggedIn});
}

const getLoan=(req,res,next)=>{
    res.render('functions/loan',{tit:'apply_loan',message:false,isAuthenticated:req.session.loggedIn});
}

const mini=(req,res,next)=>{
    accountNumber=req.session.accountNumber;
    user.findOne({accountNumber:accountNumber})
        .then(user=>{
            let details=user.details;
            let count=1;
            const doc = new PDFDocument();
            doc.pipe(res);doc.fontSize(65).fill('brown').text('Mini-statement',100,60);
            doc.fontSize(30).fill('black').text('Last few transitions...', 170, 125);
            let line=170;
            for(let pr=details.length-1;pr>=0;pr=pr-1){
                if (details[pr].check==1){
                    doc.fontSize(15).text(count+'. Deposited amount : Rs.'+details[pr].deposit,100,line);
                    line=line+25;
                    doc.fontSize(10).text('       ' + details[pr].date,100,line);
                }
                else if (details[pr].check==-1){
                    doc.fontSize(15).text(count+'. Withdrawl amount : Rs.'+details[pr].withdraw,100,line);
                    line=line+25;
                    doc.fontSize(10).text('       ' + details[pr].date,100,line);                }
                else if (details[pr].check==2){
                    doc.fontSize(15).text(count+'. Transferred amount : Rs.'+details[pr].transfer,100,line);
                    line=line+25; 
                    doc.fontSize(15).text('    Receiver account number : ' + details[pr].account,100,line);
                    line=line+25; 
                    doc.fontSize(10).text('       ' + details[pr].date,100,line); 
                }    
                else if(details[pr].check==-2){
                    doc.fontSize(15).text(count+'. Received amount : Rs.'+details[pr].transfer,100,line);
                    line=line+25; 
                    doc.fontSize(15).text('    Sender account number : ' + details[pr].account,100,line);
                    line=line+25; 
                    doc.fontSize(10).text('       ' + details[pr].date,100,line); 
                }
                line=line+30;count=count+1;
            }doc.end();
            res.setHeader('Content-Type','application/pdf');
            res.setHeader('Content-Disposition','attachment;filename="' + 'checked.pdf' + '"');
        })
        .catch(err=>{console.log(345,err,71);});
}
 
module.exports={  
    getWithdraw:getWithdraw,
    postWithdraw:postWithdraw,
    getTransfer:getTransfer,
    postTransfer:postTransfer,
    getDeposit:getDeposit,
    postDeposit:postDeposit,
    checkBalance:checkBalance,
    allDetails:allDetails,
    getLoan:getLoan,
    mini:mini
}


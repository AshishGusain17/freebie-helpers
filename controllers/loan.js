const user=require('../data/user');
const profile=require('../data/profile');
const details=require('../data/details');

const loanType=(req,res,next)=>{
    const type=req.params.type;
    console.log(7,type,87);
    if(type==1){
        res.render('loan/homeLoan',{tit:'home',isAuthenticated:req.session.loggedIn});
    }
    else if(type==2){
        res.render('loan/educationLoan',{tit:'edu',isAuthenticated:req.session.loggedIn});
    }
    else if(type==3){
        res.render('loan/agricultureLoan',{tit:'agri',isAuthenticated:req.session.loggedIn});
    }
    else if(type==4){
        res.render('loan/carLoan',{tit:'car',isAuthenticated:req.session.loggedIn});
    }
    else if(type==5){
        res.render('loan/businessLoan',{tit:'car',isAuthenticated:req.session.loggedIn});
    }
    
}



module.exports={ 
    loanType:loanType
}
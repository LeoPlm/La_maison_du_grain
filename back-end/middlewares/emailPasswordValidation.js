
export const validationEmailPassword = (req,res,next) =>{
    const {email, password} = req.body

    if(!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        return res.status(400).json({message: "Invalid email format"})
    }

    if (password.length <8){
        return res.status(400).json({message: "Your password must contain at least 8 characters"})
    }

    if(!/[A-Z]/.test(password)){
        return res.status(400).json({message: "Your password must contain at least 1 uppercase letter"})
    }

    if(!/[0-9]/.test(password)){
        return res.status(400).json({message: "Your password must contain at least 1 number"})
    }

    next()
}
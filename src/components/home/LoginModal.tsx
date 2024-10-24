import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaGoogle, FaTelegram } from "react-icons/fa"
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import CreateAccountModal from "./CreateAccountModal";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useLoginUser } from "@/hooks/useAuthData";
import toast from "react-hot-toast";
import { Rings } from 'react-loader-spinner'

interface LoginModalProps { 
    isLoginOpen: boolean;
    setIsLoginOpen: (value: 'login' | 'sign-up' | 'hidden') => void;
    setLoggedIn: (value: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({isLoginOpen, setIsLoginOpen, setLoggedIn}) => {
    const [showTelegramInput, setShowTelegramInput] = useState(false);
    const [telegramCode, setTelegramCode] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState<boolean>(false);




    const handleTelegramCodeSubmit = () => {
    if (telegramCode === '123456') {
        console.log('Telegram login successful')
        setIsLoginOpen('hidden')
        setLoggedIn(true)
    } else {
        console.log('Invalid Telegram code')
    }
    }

    // const handleLogin = (e: React.FormEvent) => {
    // e.preventDefault()
    // console.log('Login attempted with:', email, password)
    // setIsLoginOpen('hidden')
    // setLoggedIn(true)
    // }

    const handleGoogleLogin = () => {
    console.log('Google login attempted')
    setIsLoginOpen('hidden')
    setLoggedIn(true)
    }

    const handleTelegramLogin = () => {
    setShowTelegramInput(true)
    }

    const [activeModal, setActiveModal] = useState<'login' | 'register'>('login');

    const {mutate} = useLoginUser();

    const [isLoading, setIsLoading] = useState(false); 

    const handleLogin = () => {
        if (email !== '' && password !== '') {
            setIsLoading(true);
            mutate({email, password}, {onSuccess: () => {setIsLoading(false); setIsLoginOpen('hidden'); toast.success('Login successful')}, onError: () => {setIsLoading(false); toast.error('Invalid email or password')}});
        } else {
            toast.error('Please fill in all fields');
        }
    }

    return (
    <Dialog open={isLoginOpen} onOpenChange={()=>{setIsLoginOpen('hidden')}}>
    <DialogContent className="sm:max-w-[425px]">
    {activeModal === 'login' &&
        <>
            <DialogHeader>
        <DialogTitle>Login to your account</DialogTitle>
        <DialogDescription>
            {showTelegramInput ? 'Enter your Telegram Code' : 'Enter your email and password or use a social login option'}
        </DialogDescription>
            </DialogHeader>
            {showTelegramInput ? (
        <form onSubmit={(e) => { e.preventDefault(); handleTelegramCodeSubmit(); }} className="space-y-4 mt-4">
            <div className="space-y-2">
            <Label htmlFor="telegramCode">Telegram Code</Label>
            <Input id="telegramCode" type="text" placeholder="Enter Telegram Code" value={telegramCode} onChange={(e) => setTelegramCode(e.target.value)} required/>
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">Login with Telegram</Button>
            <Button type="button" onClick={() => setShowTelegramInput(false)} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800">Back to Login Options</Button>
        </form>
            ) : (
            <>
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)}required/>
                    <button className="absolute right-3 top-3" onClick={(e) => {e.preventDefault(); setShowPassword(!showPassword)}}>
                        {!showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </button>
                </div>
            </div>
            <div className="w-full bg-purple-600 h-[50px] flex justify-center items-center text-center text-white font-medium rounded-lg hover:bg-opacity-95 hover:bg-purple-700 hover:scale-[1.02] transition duration-300 ease-in cursor-pointer " onClick={handleLogin}>
                {isLoading ?  <Rings height="40" width="40" color="#ffffff" ariaLabel="rings-loading" /> :  <span>Login</span>}
            </div>
            </form>
            <div className="mt-4 space-y-2">
            <Button onClick={handleGoogleLogin} className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"><FaGoogle className="mr-2" /> Sign in with Google</Button>
            <GoogleLogin onSuccess={(res) => console.log(jwtDecode(res.credential as string))} onError={() => console.log('An error occured')} />
            <Button onClick={handleTelegramLogin} className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"><FaTelegram className="mr-2" /> Sign in with Telegram</Button>
            </div>
            </>
            )}
            <div className="text-center text-sm text-gray-500 mt-4"> Don't have an account? <button className="text-purple-600 hover:underline" onClick={(e) => { e.preventDefault(); setActiveModal('register')}}>Sign up</button> </div>
        </>}
       <CreateAccountModal active={activeModal === 'register'} goBack={setActiveModal}/>
    </DialogContent>
    </Dialog>
    )
}

export default LoginModal
// import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import LoginModal from "./LoginModal"
import { useClientStore } from "@/store/user-store";

interface NavbarProps {
    showProcessedMedia: boolean;
    setShowProcessedMedia: (value: boolean) => void;
}    

const Navbar:React.FC<NavbarProps> = ({showProcessedMedia, setShowProcessedMedia}) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [, setIsLoginOpen] = useState(false)

    const {auth_token} = useClientStore();

    const [modalToOpen, setModalToOpen] = useState<'login' | 'sign-up' | 'hidden'>('hidden');


    const toggleProcessedMedia = () => {
        setShowProcessedMedia(!showProcessedMedia)
    }

    return (<>
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <svg className="h-8 w-8 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-2 text-xl font-bold text-gray-900">Vidnoz</span>
                    </div>
                    {/* <nav className="hidden md:flex space-x-4">
                        <a href="#" className="text-gray-500 hover:text-gray-900">Features <ChevronDown className="inline h-4 w-4" /></a>
                        <a href="#" className="text-gray-500 hover:text-gray-900">Free AI Tools <ChevronDown className="inline h-4 w-4" /></a>
                        <a href="#" className="text-gray-500 hover:text-gray-900">Use Cases <ChevronDown className="inline h-4 w-4" /></a>
                        <a href="#" className="text-gray-500 hover:text-gray-900">Pricing <ChevronDown className="inline h-4 w-4" /></a>
                        <a href="#" className="text-gray-500 hover:text-gray-900">For Business <ChevronDown className="inline h-4 w-4" /></a>
                        <a href="#" className="text-gray-500 hover:text-gray-900">Company <ChevronDown className="inline h-4 w-4" /></a>
                    </nav> */}
                    <div className="flex items-center">
                        {auth_token ? (
                        <Button variant="ghost" className="text-gray-700 mr-4" onClick={toggleProcessedMedia}> Welcome, ADMIN 1</Button>
                        ) : (
                        <Button variant="ghost" className="text-gray-500 hover:text-gray-900 mr-4" onClick={() => {setIsLoginOpen(true); setModalToOpen('login')}}>Login</Button>
                        )}
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white">{loggedIn ? 'ADMIN 1' : 'Create Free AI Video'}</Button>
                    </div>
                </div>
            </div>
        </header>
        <LoginModal isLoginOpen={modalToOpen === 'login'} setIsLoginOpen={setModalToOpen} setLoggedIn={setLoggedIn} />
     </>)
}

export default Navbar
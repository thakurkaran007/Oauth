import { Navbar } from "./_components/navbar";

const AuthLayout = ({ children }: { children : React.ReactNode }) => {
  return (
      <div className="flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">          
            <Navbar/>
          {children}
      </div>
  );
}
export default AuthLayout;
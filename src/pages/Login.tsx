
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }
    
    if (mode === "signin") {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-hublab-purple/10 to-hublab-blue/10 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <h1 className="text-3xl font-bold font-heading">
              <span className="text-hublab-purple">Hub</span>
              <span className="text-hublab-blue">Lab</span>
            </h1>
          </div>
          <p className="text-muted-foreground">Área exclusiva de membros premium</p>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>{mode === "signin" ? "Login" : "Criar Conta"}</CardTitle>
            <CardDescription>
              {mode === "signin" 
                ? "Entre com suas credenciais para acessar o conteúdo exclusivo"
                : "Crie sua conta para acessar o conteúdo exclusivo"}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu.email@exemplo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  {mode === "signin" && (
                    <a href="#" className="text-xs text-hublab-blue hover:underline">
                      Esqueceu a senha?
                    </a>
                  )}
                </div>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-hublab-purple hover:bg-hublab-purple/90">
                {mode === "signin" ? "Entrar" : "Criar Conta"}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              >
                {mode === "signin" 
                  ? "Não tem uma conta? Crie agora"
                  : "Já tem uma conta? Entre agora"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;

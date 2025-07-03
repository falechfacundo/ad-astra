import { SignInButton } from "@clerk/clerk-react";
import { Button } from "@nextui-org/react";

export default function AuthProtection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-4 text-center">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Acceso Requerido
            </h1>
            <p className="text-gray-600">
              Para gestionar contratos y propuestas necesitas estar autenticado
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Inicia sesión con tu cuenta de Google para continuar
            </p>

            <SignInButton mode="modal">
              <Button
                className="w-full bg-electric-violet-600 text-white hover:bg-electric-violet-700 transition-colors duration-300 ease-in-out"
                size="lg"
              >
                Iniciar Sesión
              </Button>
            </SignInButton>

            <p className="text-xs text-gray-400">
              Los contratos solo pueden ser firmados por usuarios autenticados
              para garantizar la validez legal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

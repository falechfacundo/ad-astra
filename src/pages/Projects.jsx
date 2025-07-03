import { Link } from "react-router-dom";
import { Card, CardBody, Button, Chip } from "@nextui-org/react";
import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { AnimatedGridPattern } from "../components/magic_ui/AnimatedGridPattern.jsx";
import { useEffect, useState } from "react";
import { worker_url } from "../lib/constant.js";
import Layout from "../components/layout/Layout.jsx";

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "firmado":
      return "success";
    case "deposito_pendiente":
      return "warning";
    case "in_progress":
      return "primary";
    case "completed":
      return "success";
    default:
      return "default";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "pending":
      return "Pendiente";
    case "firmado":
      return "Firmado";
    case "deposito_pendiente":
      return "Depósito Pendiente";
    case "in_progress":
      return "En Progreso";
    case "completed":
      return "Completado";
    default:
      return status;
  }
};

export default function Projects() {
  const { user } = useUser();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) {
        setProjects([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        // Nuevo endpoint: GET /projects?cliente=<id_cliente>
        const response = await fetch(
          `${worker_url}/projects?cliente=${user.id}`
        );
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        // El backend ahora retorna un array de proyectos
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("No se pudieron cargar los proyectos. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [user]);

  return (
    <Layout>
      {/* AnimatedGridPattern background */}
      <div className="fixed inset-0 -z-10">
        {/* AnimatedGridPattern como fondo */}
        <AnimatedGridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          strokeDasharray={0}
          numSquares={30}
          className="absolute inset-0 h-full w-full fill-electric-violet-100/20 stroke-electric-violet-300/30"
          maxOpacity={0.3}
        />
      </div>
      <div className="container mx-auto px-4 py-32 max-w-7xl col-span-full relative">
        <SignedOut>
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Acceso Restringido
            </h1>
            <p className="text-gray-600 mb-8 max-w-md">
              Necesitas iniciar sesión para ver tus proyectos y propuestas.
            </p>
            <SignInButton mode="modal">
              <Button className="bg-electric-violet-600 text-white hover:bg-electric-violet-700 transition-colors px-8 py-3">
                Iniciar Sesión
              </Button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Mis Proyectos
            </h1>
            <p className="text-gray-600">
              Gestiona todas tus propuestas y contratos en un solo lugar
            </p>
            {user && (
              <p className="text-sm text-gray-500 mt-2">
                Usuario: {user.fullName || user.firstName} •{" "}
                {user.primaryEmailAddress?.emailAddress}
              </p>
            )}
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="backdrop-blur-md bg-electric-violet-500/40 border border-electric-violet-300/50 shadow-lg">
              <CardBody className="text-white">
                <div className="text-2xl font-bold">{projects.length}</div>
                <div className="text-electric-violet-100">
                  Total de Proyectos
                </div>
              </CardBody>
            </Card>
            <Card className="backdrop-blur-md bg-turquoise-500/40 border border-turquoise-300/50 shadow-lg">
              <CardBody className="text-white">
                <div className="text-2xl font-bold">
                  {projects.filter((p) => p.status === "pending").length}
                </div>
                <div className="text-turquoise-100">Pendientes</div>
              </CardBody>
            </Card>
            <Card className="backdrop-blur-md bg-electric-violet-500/40 border border-electric-violet-300/50 shadow-lg">
              <CardBody className="text-white">
                <div className="text-2xl font-bold">
                  {projects.filter((p) => p.status === "firmado").length}
                </div>
                <div className="text-electric-violet-100">Firmados</div>
              </CardBody>
            </Card>
            <Card className="backdrop-blur-md bg-turquoise-500/40 border border-turquoise-300/50 shadow-lg">
              <CardBody className="text-white">
                <div className="text-2xl font-bold">
                  {projects.filter((p) => p.status === "in_progress").length}
                </div>
                <div className="text-turquoise-100">En Progreso</div>
              </CardBody>
            </Card>
          </div>

          {/* Lista de proyectos */}
          {loading ? (
            <div className="text-center py-16 text-lg text-gray-500">
              Cargando proyectos...
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="backdrop-blur-md bg-white/40 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/50"
                >
                  <CardBody className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {project.nombre}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {/* Si hay propuesta, mostrar un preview del link o texto corto */}
                          {project.propuesta
                            ? typeof project.propuesta === "string" &&
                              project.propuesta.length > 60
                              ? project.propuesta.slice(0, 60) + "..."
                              : project.propuesta
                            : "Sin propuesta"}
                        </p>
                      </div>
                      <Chip
                        color={getStatusColor(project.status)}
                        variant="flat"
                        size="sm"
                      >
                        {getStatusText(project.status)}
                      </Chip>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">ID Cliente:</span>
                        <span className="font-medium">
                          {project.id_cliente}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">ID Proyecto:</span>
                        <span className="font-mono text-xs text-gray-400">
                          {project.id}
                        </span>
                      </div>
                    </div>

                    <Link to={`/proposal?id=${project.id}`}>
                      <Button className="w-full bg-electric-violet-600 text-white hover:bg-electric-violet-700 transition-colors">
                        Ver Detalles
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
          {!loading && projects.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tienes proyectos aún
              </h3>
              <p className="text-gray-600">
                Cuando tengas propuestas asignadas, aparecerán aquí.
              </p>
            </div>
          )}
        </SignedIn>
      </div>
    </Layout>
  );
}

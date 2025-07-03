import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useUser, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import Layout from "../components/layout/Layout.jsx";
import PDFViewer from "../components/PDFViewer";
import { AnimatedGridPattern } from "../components/magic_ui/AnimatedGridPattern.jsx";
import {
  InfoIcon,
  LockLoginIcon,
  CheckIcon,
  StripeIcon,
  PaperClipIcon,
} from "../components/assets/icons";
import { useProjectsStore } from "../store/projects.js";

export default function Proposal() {
  const [searchParams] = useSearchParams();
  const proposalId = searchParams.get("id");
  const { user } = useUser();
  const {
    getProjectById,
    loading,
    error,
    fetchProjects,
    updateProjectStatus,
    setProjectPaymentLink,
  } = useProjectsStore();

  const [contractPdfUrl, setContractPdfUrl] = useState(null);
  const [loadingContract, setLoadingContract] = useState(false);
  const [contractError, setContractError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [fullName, setFullName] = useState("");
  const [nameError, setNameError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Get proposal/project from backend
  const [proposal, setProposal] = useState(null);

  useEffect(() => {
    const fetchProposal = async () => {
      if (proposalId) {
        const data = await getProjectById(proposalId);
        setProposal(data);
      }
    };
    fetchProposal();
  }, [proposalId, getProjectById]);

  // Fetch projects if not loaded
  useEffect(() => {
    if (user && !proposal) {
      fetchProjects(user.id);
    }
  }, [user, proposal, fetchProjects]);

  // Auto-fill user name
  useEffect(() => {
    if (user && !fullName) {
      setFullName(
        user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim()
      );
    }
  }, [user, fullName]);

  // Fetch contract PDF
  const fetchContract = async (contractName) => {
    setLoadingContract(true);
    setContractError(null);
    try {
      // Try local public folder first
      let response = await fetch(`/${contractName}`);
      if (!response.ok) {
        // Fallback to worker endpoint
        response = await fetch(
          `https://ad-astra-propuestas-worker.faiafacundo.workers.dev/contract/${contractName}`,
          { method: "GET", headers: { Accept: "application/pdf" } }
        );
      }
      if (!response.ok)
        throw new Error(`No se pudo cargar el PDF: ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setContractPdfUrl(url);
      onOpen();
    } catch (error) {
      setContractError(`Error cargando PDF: ${error.message}`);
    } finally {
      setLoadingContract(false);
    }
  };

  // Create payment link
  const createPaymentLink = (contractId, amount, clientEmail) => {
    return fetch(
      `https://ad-astra-propuestas-worker.faiafacundo.workers.dev/create-payment-link`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contractId, amount, clientEmail }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            throw new Error(
              `Failed to create payment link: ${response.status} - ${errorText}`
            );
          });
        }
        return response.json();
      })
      .then((data) => data.paymentLink);
  };

  // Sign contract
  const signContract = async () => {
    if (!fullName.trim()) {
      setNameError("Por favor ingrese su nombre completo");
      return;
    }
    setNameError("");
    setUpdating(true);
    try {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = now.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedDateTime = `${formattedDate}, ${formattedTime}`;
      const signatureData = {
        status: "deposito_pendiente",
        firmado_por: fullName.trim(),
        firmado_email: user?.primaryEmailAddress?.emailAddress,
        firmado_clerk_id: user?.id,
        signedBy: {
          name: fullName.trim(),
          email: user?.primaryEmailAddress?.emailAddress,
          userId: user?.id,
          signedAt: now.toISOString(),
          formattedSignedAt: formattedDateTime,
        },
      };
      // Update status in backend and store
      await updateProjectStatus(
        proposal.id,
        "deposito_pendiente",
        signatureData
      );
      // If deposit, create payment link
      if (proposal.deposito_inicial && proposal.deposito_inicial > 0) {
        try {
          const paymentLink = await createPaymentLink(
            proposal.id,
            proposal.deposito_inicial,
            user?.primaryEmailAddress?.emailAddress || "cliente@example.com"
          );
          await setProjectPaymentLink(proposal.id, paymentLink);
        } catch (paymentError) {
          alert(
            `Contrato firmado exitosamente, pero hubo un problema creando el link de pago: ${paymentError.message}\n\nPuede proceder al pago manualmente desde la página de contratos.`
          );
        }
      }
      handleModalClose();
    } catch (error) {
      setNameError("Error al firmar el contrato. Intente nuevamente.");
    } finally {
      setUpdating(false);
    }
  };

  // Payment link logic
  const generatePaymentLink = () => {
    if (proposal?.paymentLink) return proposal.paymentLink;
    const amount = proposal?.deposito_inicial;
    const description = `Depósito inicial - Propuesta ${proposal?.id}`;
    return `https://link.mercadopago.com.ar/payment?amount=${amount}&description=${encodeURIComponent(
      description
    )}&client_id=${proposal?.id_cliente}`;
  };

  // Clean up contract PDF URL
  useEffect(() => {
    return () => {
      if (contractPdfUrl) URL.revokeObjectURL(contractPdfUrl);
    };
  }, [contractPdfUrl]);

  // Clean up form/modal state
  const handleModalClose = () => {
    onClose();
    if (!isSigned) {
      setFullName("");
      setNameError("");
    }
    if (contractPdfUrl) {
      URL.revokeObjectURL(contractPdfUrl);
      setContractPdfUrl(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Cargando propuesta...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="max-w-md">
          <CardBody>
            <div className="text-red-500 text-center">
              <h3 className="text-lg font-semibold mb-2">Error</h3>
              <p>{error}</p>
              <p className="text-sm mt-2 text-gray-600">
                Ejemplo de URL: /proposal?id=123
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
  if (!proposal) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="max-w-md">
          <CardBody>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">
                Propuesta no encontrada
              </h3>
              <p>No se encontró la propuesta con ID: {proposalId}</p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  const hasContract = proposal.contrato;
  const isPaid = proposal.propuesta === "true";
  const isSigned =
    proposal.contrato === "true" || proposal.status === "deposito_pendiente";
  const figmaLink = !isPaid ? proposal.propuesta : null;

  return (
    <Layout>
      {/* AnimatedGridPattern background */}
      <div className="fixed inset-0 -z-10">
        <AnimatedGridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          strokeDasharray={0}
          numSquares={30}
          className="absolute inset-0 h-full w-full fill-electric-violet-100/20 stroke-electric-violet-300/30"
          maxOpacity={0.3}
          duration={2}
        />
      </div>
      <div className="container mx-auto px-4 py-32 max-w-7xl col-span-full relative">
        {/* Header con información del usuario */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestión de Contratos
            </h1>
          </div>
        </div>

        {/* Alerta para usuarios no autenticados */}
        <SignedOut>
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <InfoIcon className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-blue-900 mb-1">
                  Vista de Propuesta
                </p>
                <p className="text-blue-700 text-sm">
                  Puedes revisar los detalles de la propuesta libremente. Para
                  ver y firmar el contrato necesitarás iniciar sesión con tu
                  cuenta de Google.
                </p>
              </div>
            </div>
          </div>
        </SignedOut>

        <Card className="mb-6">
          {/* <CardHeader>
          <h1 className="text-2xl font-bold">Propuesta #{proposal.id}</h1>
        </CardHeader> */}
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {/* <div>
              <span className="text-sm text-gray-600">
                Estado de Propuesta:
              </span>
              <p
                className={`font-semibold ${
                  isPaid ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {isPaid ? "Pagada" : "Pendiente de Pago"}
              </p>
            </div> */}
              {/* <div>
              <span className="text-sm text-gray-600">Estado de Contrato:</span>
              <p
                className={`font-semibold ${
                  isSigned
                    ? "text-green-600"
                    : hasContract
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                {isSigned
                  ? "Firmado"
                  : hasContract
                  ? "Disponible para firmar"
                  : "No disponible"}
              </p>
            </div> */}
              <div>
                <span className="text-sm text-gray-600">Depósito Inicial:</span>
                <div className="space-y-2">
                  <p className="font-semibold">
                    {proposal.deposito_inicial
                      ? `$${proposal.deposito_inicial.toLocaleString()}`
                      : "No definido"}
                  </p>
                  {/* Mostrar botón de pagar solo si el contrato está firmado y hay un depósito definido */}
                  {isSigned && proposal.deposito_inicial && (
                    <div className="space-y-2">
                      <Button
                        onClick={() =>
                          window.open(generatePaymentLink(), "_blank")
                        }
                        className="bg-electric-violet-600 text-white hover:bg-electric-violet-700 transition-colors duration-300 ease-in-out flex items-center gap-2"
                        disabled={proposal.paymentStatus === "processing"}
                      >
                        {proposal.paymentStatus === "processing"
                          ? "Generando Link..."
                          : "Pagar Depósito"}
                      </Button>
                      {proposal.paymentLink && (
                        <p className="text-xs text-green-600">
                          ✓ Link de pago generado y listo
                        </p>
                      )}
                      {proposal.paymentStatus === "completed" && (
                        <p className="text-xs text-green-600">
                          ✓ Depósito pagado exitosamente
                        </p>
                      )}
                      {/* Branding de Stripe */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                        <span>Pagos seguros con</span>
                        <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded border">
                          <StripeIcon className="w-4 h-4 text-[#635bff]" />
                          <span className="font-medium text-[#635bff]">
                            Stripe
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">
                  Estado del Proyecto:
                </span>
                <p
                  className={`font-semibold capitalize ${
                    proposal.status === "completed"
                      ? "text-green-600"
                      : proposal.status === "in_progress"
                      ? "text-blue-600"
                      : proposal.status === "pending"
                      ? "text-yellow-600"
                      : proposal.status === "deposito_pendiente"
                      ? "text-orange-600"
                      : "text-gray-600"
                  }`}
                >
                  {proposal.status === "pending"
                    ? "Pendiente"
                    : proposal.status === "in_progress"
                    ? "En Progreso"
                    : proposal.status === "completed"
                    ? "Completado"
                    : proposal.status === "deposito_pendiente"
                    ? "Depósito Pendiente"
                    : proposal.status || "No definido"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Botones principales */}
              <div className="flex flex-wrap gap-4">
                {hasContract && !isSigned && (
                  <>
                    {/* Mostrar botón solo cuando el contrato NO esté firmado */}
                    <SignedIn>
                      <Button
                        onClick={() => {
                          fetchContract(proposal.contrato);
                        }}
                        isLoading={loadingContract}
                        disabled={loadingContract}
                        className="bg-electric-violet-600 text-white hover:bg-electric-violet-700 transition-colors duration-300 ease-in-out"
                      >
                        {loadingContract
                          ? "Cargando Contrato..."
                          : "Ver Contrato y Firmar"}
                      </Button>
                    </SignedIn>
                    <SignedOut>
                      <SignInButton
                        mode="modal"
                        redirectUrl={window.location.href}
                      >
                        <Button className="bg-electric-violet-600 text-white hover:bg-electric-violet-700 transition-colors duration-300 ease-in-out">
                          <LockLoginIcon className="w-4 h-4 mr-2" />
                          Iniciar Sesión para Ver Contrato
                        </Button>
                      </SignInButton>
                      <p className="text-sm text-gray-600 mt-2">
                        Necesitas estar autenticado para ver y firmar contratos
                      </p>
                    </SignedOut>
                  </>
                )}
                {isSigned && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-green-900 text-lg">
                            Contrato Firmado Digitalmente
                          </p>
                          <p className="text-green-700 text-sm">
                            Este contrato ha sido firmado y ya no puede ser
                            modificado
                          </p>
                        </div>
                      </div>

                      {/* Botón Ver Contrato estilo adjunto */}
                      <SignedIn>
                        <Button
                          onClick={() => {
                            const contractFile = "proposal_gbr-contrato.pdf";
                            fetchContract(contractFile);
                          }}
                          isLoading={loadingContract}
                          disabled={loadingContract}
                          size="sm"
                          className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300 ease-in-out flex items-center gap-2"
                        >
                          <PaperClipIcon className="w-4 h-4" />
                          {loadingContract ? "Cargando..." : "Ver Contrato"}
                        </Button>
                      </SignedIn>
                    </div>

                    {/* Detalles de la firma */}
                    {proposal.signatureData && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        <div className="bg-white rounded-lg p-3 border">
                          <p className="text-xs text-gray-600 mb-1">
                            Firmado por:
                          </p>
                          <p className="font-semibold text-gray-900 text-sm">
                            {proposal.signatureData.name}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border">
                          <p className="text-xs text-gray-600 mb-1">Email:</p>
                          <p className="font-semibold text-gray-900 text-sm">
                            {proposal.signatureData.email}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border">
                          <p className="text-xs text-gray-600 mb-1">
                            Fecha de firma:
                          </p>
                          <p className="font-semibold text-gray-900 text-sm">
                            {new Date(
                              proposal.signatureData.signedAt
                            ).toLocaleString("es-ES", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border">
                          <p className="text-xs text-gray-600 mb-1">
                            ID de Usuario:
                          </p>
                          <p className="font-semibold text-gray-900 text-xs font-mono">
                            {proposal.signatureData.userId}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Aviso de validez legal */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-800">
                        <strong>Validez Legal:</strong> Esta firma digital tiene
                        plena validez legal y contractual. El documento no puede
                        ser modificado una vez firmado.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {contractError && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                Error al cargar el contrato: {contractError}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Iframe para mostrar la propuesta de Figma */}
        <div className="relative w-full" style={{ height: "80vh" }}>
          {figmaLink ? (
            <iframe
              src={figmaLink}
              className="w-full h-full border rounded-lg"
              title="Propuesta Figma"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              onError={(e) => {
                console.log("Iframe error (expected from Figma):", e);
                // Suprimir errores de Figma en consola
              }}
            />
          ) : isPaid ? (
            <div className="flex items-center justify-center h-full bg-green-100 rounded-lg">
              <div className="text-center">
                <div className="text-green-600 text-4xl mb-4">✓</div>
                <p className="text-green-700 font-semibold">Propuesta Pagada</p>
                <p className="text-green-600 text-sm">
                  La propuesta ha sido aceptada y pagada
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
              <p className="text-gray-500">
                No hay enlace de Figma disponible para esta propuesta
              </p>
            </div>
          )}
        </div>

        {/* Modal para mostrar el PDF del contrato */}
        <Modal
          isOpen={isOpen}
          onClose={handleModalClose}
          size="full"
          scrollBehavior="inside"
          isDismissable={false}
          hideCloseButton={false}
          className="max-h-screen"
        >
          <ModalContent className="max-h-screen">
            <ModalHeader className="flex flex-col gap-1 border-b">
              <div className="flex justify-between items-center w-full">
                <div>
                  <h3 className="text-xl font-bold">
                    Contrato - {proposal.contrato}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Revise el contrato usando los controles de navegación y zoom
                  </p>
                </div>
                {contractPdfUrl && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="bordered"
                      onClick={() => window.open(contractPdfUrl, "_blank")}
                      className="hover:bg-gray-300/10 transition-colors duration-300 ease-in-out"
                    >
                      Abrir contrato en nueva pestaña
                    </Button>
                    <Button
                      size="sm"
                      variant="bordered"
                      as="a"
                      href={contractPdfUrl}
                      download={`${proposal.contrato}-contrato.pdf`}
                      className="hover:bg-gray-300/10 transition-colors duration-300 ease-in-out"
                    >
                      Descargar contrato PDF
                    </Button>
                  </div>
                )}
              </div>
            </ModalHeader>
            <ModalBody className="gap-0 p-0 flex-1">
              {contractPdfUrl && (
                <div className="flex flex-col h-full">
                  {/* Visor PDF.js avanzado */}
                  <div className="flex-1" style={{ minHeight: "60vh" }}>
                    <PDFViewer
                      fileUrl={contractPdfUrl}
                      onLoadSuccess={(pdf) => {
                        console.log("PDF loaded successfully:", pdf);
                      }}
                      onLoadError={(error) => {
                        console.error("PDF load error:", error);
                        setContractError(
                          `Error cargando PDF: ${error.message}`
                        );
                      }}
                    />
                  </div>

                  {/* Sección de firma mejorada o información de firma existente */}
                  <div className="border-t bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                    <div className="max-w-3xl mx-auto">
                      {isSigned ? (
                        /* Mostrar información de la firma existente */
                        <div className="text-center">
                          <h4 className="text-2xl font-bold text-gray-800 mb-2">
                            Contrato Firmado Digitalmente
                          </h4>
                          <p className="text-gray-600 mb-6">
                            Este contrato ha sido firmado y ya no puede ser
                            modificado
                          </p>

                          {/* Información de la firma */}
                          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                            <div className="flex items-center justify-center gap-3 mb-4">
                              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckIcon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="font-bold text-green-900 text-xl">
                                  Firmado Exitosamente
                                </p>
                              </div>
                            </div>

                            {/* Detalles de la firma */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                              {proposal.signatureData && (
                                <>
                                  <div className="bg-white rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">
                                      Firmado por:
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                      {proposal.signatureData.name}
                                    </p>
                                  </div>
                                  <div className="bg-white rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">
                                      Email:
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                      {proposal.signatureData.email}
                                    </p>
                                  </div>
                                  <div className="bg-white rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">
                                      Fecha de firma:
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                      {new Date(
                                        proposal.signatureData.signedAt
                                      ).toLocaleString("es-ES", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </p>
                                  </div>
                                  <div className="bg-white rounded-lg p-4">
                                    <p className="text-sm text-gray-600 mb-1">
                                      ID de Usuario:
                                    </p>
                                    <p className="font-semibold text-gray-900 text-xs">
                                      {proposal.signatureData.userId}
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>

                            {/* Aviso de validez legal */}
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <p className="text-sm text-blue-800">
                                <strong>Validez Legal:</strong> Esta firma
                                digital tiene plena validez legal y contractual.
                                El documento no puede ser modificado una vez
                                firmado.
                              </p>
                            </div>
                          </div>

                          {/* Botón para cerrar */}
                          <div className="mt-6">
                            <Button
                              variant="light"
                              size="lg"
                              onPress={handleModalClose}
                              className="px-8 text-gray-600 hover:text-gray-800"
                            >
                              Cerrar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        /* Mostrar formulario de firma para contratos no firmados */
                        <div>
                          <div className="text-center mb-6">
                            <h4 className="text-2xl font-bold text-gray-800 mb-2">
                              Firma Digital del Contrato
                            </h4>
                            <p className="text-gray-600">
                              Complete los datos para proceder con la firma
                              electrónica
                            </p>
                          </div>

                          <div className="space-y-6">
                            {/* Información del usuario autenticado */}
                            {user && (
                              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <CheckIcon className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-green-900">
                                      Usuario Autenticado
                                    </p>
                                    <p className="text-green-700 text-sm">
                                      {user.fullName ||
                                        `${user.firstName} ${user.lastName}`.trim()}{" "}
                                      • {user.primaryEmailAddress?.emailAddress}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Información importante */}
                            <div className="bg-blue-100 border border-blue-300 rounded-xl p-5">
                              <div className="flex items-start gap-3">
                                <div>
                                  <p className="font-semibold text-blue-900 mb-2">
                                    Antes de firmar, verifique que:
                                  </p>
                                  <ul className="text-blue-800 space-y-1 text-sm">
                                    <li>
                                      • Ha revisado todo el documento usando el
                                      visor superior
                                    </li>
                                    <li>
                                      • Está de acuerdo con todos los términos y
                                      condiciones
                                    </li>
                                    <li>
                                      • Los datos del proyecto son correctos
                                    </li>
                                    <li>
                                      • Comprende sus derechos y obligaciones
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Formulario de firma */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                              <Input
                                label="Nombre Completo"
                                placeholder="Ingrese su nombre completo tal como aparece en su documento de identidad"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                isInvalid={!!nameError}
                                errorMessage={nameError}
                                variant="bordered"
                                size="lg"
                                isRequired
                                classNames={{
                                  input: "text-lg",
                                  inputWrapper:
                                    "border-2 border-gray-300 hover:border-blue-400 focus-within:border-blue-500",
                                }}
                              />
                            </div>

                            {/* Botones de acción */}
                            <div className="flex gap-4 justify-center pt-4">
                              <Button
                                variant="light"
                                size="lg"
                                onPress={handleModalClose}
                                disabled={updating}
                                className="px-8 text-gray-600 hover:text-gray-800"
                              >
                                Cancelar
                              </Button>
                              <Button
                                color="primary"
                                size="lg"
                                onPress={signContract}
                                isLoading={updating}
                                disabled={updating || !fullName.trim()}
                                className="px-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                              >
                                {updating ? (
                                  <span>Procesando firma...</span>
                                ) : (
                                  <span>Firmar Contrato Digitalmente</span>
                                )}
                              </Button>
                            </div>

                            {/* Aviso legal */}
                            <div className="text-center space-y-3">
                              <p className="text-xs text-gray-500 leading-relaxed">
                                <strong>Aviso Legal:</strong> Al hacer clic en
                                &quot;Firmar Contrato&quot;, usted acepta todos
                                los términos y condiciones establecidos en el
                                documento. Esta firma digital tiene plena
                                validez legal y contractual.
                              </p>

                              {/* Información de Stripe si hay depósito */}
                              {proposal.deposito_inicial &&
                                proposal.deposito_inicial > 0 && (
                                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                                    <span>
                                      Después de firmar, podrá proceder al pago
                                      seguro con
                                    </span>
                                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded border">
                                      <StripeIcon className="w-3 h-3 text-[#635bff]" />
                                      <span className="font-medium text-[#635bff]">
                                        Stripe
                                      </span>
                                    </div>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </Layout>
  );
}

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Button,
  Input,
  Spinner,
  Chip,
  Tooltip,
  ButtonGroup,
} from "@nextui-org/react";

// Configurar PDF.js worker (método recomendado por la documentación)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Iconos de navegación
const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
    />
  </svg>
);

const ZoomOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6"
    />
  </svg>
);

const ZoomInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
    />
  </svg>
);

const FullscreenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
    />
  </svg>
);

// Iconos adicionales para los controles restantes
const ViewColumnsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v11.25c0 .621.504 1.125 1.125 1.125Z"
    />
  </svg>
);

const ArrowsPointingOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    />
  </svg>
);

// Iconos pequeños para la barra de estado
const DocumentIconSmall = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-3"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
    />
  </svg>
);

const MagnifyingGlassIconSmall = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-3"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);

const ViewColumnsIconSmall = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-3"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v11.25c0 .621.504 1.125 1.125 1.125Z"
    />
  </svg>
);

const FullscreenIconSmall = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-3"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
    />
  </svg>
);

export default function PDFViewer({ fileUrl, onLoadSuccess, onLoadError }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.5);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [pageWidth, setPageWidth] = useState(null);
  const containerRef = useRef(null);

  // Opciones para react-pdf (memoizadas para evitar recargas innecesarias)
  const options = useMemo(
    () => ({
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
    }),
    []
  );

  // Callback cuando el documento se carga exitosamente
  const onDocumentLoadSuccess = useCallback(
    ({ numPages }) => {
      setNumPages(numPages);
      setIsLoading(false);
      onLoadSuccess && onLoadSuccess({ numPages });
    },
    [onLoadSuccess]
  );

  // Callback cuando hay error al cargar el documento
  const onDocumentLoadError = useCallback(
    (error) => {
      setIsLoading(false);
      console.error("Error loading PDF:", error);
      onLoadError && onLoadError(error);
    },
    [onLoadError]
  );

  // Callback cuando una página se carga
  const onPageLoadSuccess = useCallback(
    (page) => {
      if (!pageWidth) {
        setPageWidth(page.width);
      }
    },
    [pageWidth]
  );

  // Navegación de páginas
  const goToPrevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber((prev) => Math.min(numPages || 1, prev + 1));
  }, [numPages]);

  const goToPage = useCallback(
    (page) => {
      const pageNum = parseInt(page);
      if (pageNum >= 1 && pageNum <= (numPages || 1)) {
        setPageNumber(pageNum);
      }
    },
    [numPages]
  );

  // Controles de zoom
  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(3.0, prev + 0.25));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(0.5, prev - 0.25));
  }, []);

  const resetZoom = useCallback(() => {
    setScale(0.5);
  }, []);

  const fitToWidth = useCallback(() => {
    if (containerRef.current && pageWidth) {
      const containerWidth = containerRef.current.offsetWidth - 40;
      const newScale = Math.min(2.0, containerWidth / pageWidth);
      setScale(Math.max(0.5, newScale));
    } else {
      setScale(1.2);
    }
  }, [pageWidth]);

  const fitToPage = useCallback(() => {
    if (containerRef.current && pageWidth) {
      const containerWidth = containerRef.current.offsetWidth - 40;
      const containerHeight = containerRef.current.offsetHeight - 100;
      const pageHeight = pageWidth * 1.414; // Proporción A4

      const scaleByWidth = containerWidth / pageWidth;
      const scaleByHeight = containerHeight / pageHeight;
      const newScale = Math.min(2.0, Math.min(scaleByWidth, scaleByHeight));

      setScale(Math.max(0.5, newScale));
    } else {
      setScale(0.5);
    }
  }, [pageWidth]);

  // Controles adicionales
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const toggleThumbnails = useCallback(() => {
    setShowThumbnails((prev) => !prev);
  }, []);

  // Atajos de teclado
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.target.tagName === "INPUT") return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          goToPrevPage();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNextPage();
          break;
        case "+":
        case "=":
          event.preventDefault();
          zoomIn();
          break;
        case "-":
          event.preventDefault();
          zoomOut();
          break;
        case "0":
          event.preventDefault();
          resetZoom();
          break;
        case "Escape":
          if (isFullscreen) {
            event.preventDefault();
            setIsFullscreen(false);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevPage, goToNextPage, zoomIn, zoomOut, resetZoom, isFullscreen]);

  // Auto-ajustar cuando cambia el tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && pageWidth) {
        const containerWidth = containerRef.current.offsetWidth - 40;
        const newScale = Math.min(2.0, containerWidth / pageWidth);
        if (newScale !== scale && newScale > 0.5) {
          setScale(newScale);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pageWidth, scale]);

  return (
    <div
      className={`flex flex-col bg-gray-50 ${
        isFullscreen ? "fixed inset-0 z-50" : "h-full"
      }`}
      ref={containerRef}
    >
      {/* Barra de herramientas */}
      <div className="bg-white border-b border-gray-200 p-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          {/* Controles de navegación */}
          <div className="flex items-center gap-2">
            <ButtonGroup size="sm" variant="bordered">
              <Button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="px-3"
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                onClick={goToNextPage}
                disabled={pageNumber >= (numPages || 1)}
                className="px-3"
              >
                <ChevronRightIcon />
              </Button>
            </ButtonGroup>

            <div className="flex items-center gap-2">
              <Input
                size="sm"
                variant="bordered"
                value={pageNumber}
                onChange={(e) => goToPage(e.target.value)}
                className="w-16"
                type="number"
                min="1"
                max={numPages || 1}
              />
              <span className="text-sm text-gray-600 whitespace-nowrap">
                de {numPages || "..."}
              </span>
            </div>
          </div>

          {/* Controles de zoom */}
          <div className="flex items-center gap-2">
            <ButtonGroup size="sm" variant="bordered">
              <Tooltip content="Alejar (-)">
                <Button onClick={zoomOut} disabled={scale <= 0.5}>
                  <ZoomOutIcon />
                </Button>
              </Tooltip>
              <Tooltip content="Acercar (+)">
                <Button onClick={zoomIn} disabled={scale >= 3.0}>
                  <ZoomInIcon />
                </Button>
              </Tooltip>
              <Tooltip content="Zoom 50% (0)">
                <Button onClick={resetZoom}>50%</Button>
              </Tooltip>
              <Tooltip content="Ajustar ancho">
                <Button onClick={fitToWidth}>
                  <ArrowsPointingOutIcon />
                </Button>
              </Tooltip>
              <Tooltip content="Ajustar página">
                <Button onClick={fitToPage}>
                  <DocumentIcon />
                </Button>
              </Tooltip>
            </ButtonGroup>
          </div>

          {/* Controles adicionales */}
          <div className="flex items-center gap-2">
            <ButtonGroup size="sm" variant="bordered">
              <Tooltip content="Ver miniaturas">
                <Button
                  onClick={toggleThumbnails}
                  color={showThumbnails ? "primary" : "default"}
                >
                  <ViewColumnsIcon />
                </Button>
              </Tooltip>
              <Tooltip
                content={
                  isFullscreen ? "Salir pantalla completa" : "Pantalla completa"
                }
              >
                <Button onClick={toggleFullscreen}>
                  <FullscreenIcon />
                </Button>
              </Tooltip>
            </ButtonGroup>
          </div>
        </div>

        {/* Atajos de teclado */}
        <div className="mt-2 text-xs text-gray-500 border-t pt-2">
          <span className="font-medium">Atajos:</span>
          <span className="ml-2">← → Navegar páginas</span>
          <span className="ml-3">+ - Zoom</span>
          <span className="ml-3">0 Reset zoom</span>
          <span className="ml-3">Esc Salir pantalla completa</span>
        </div>
      </div>

      {/* Visor del documento */}
      <div className="flex flex-1 overflow-hidden">
        {/* Panel de miniaturas */}
        {showThumbnails && (
          <div className="w-48 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <DocumentIcon />
                Páginas
              </h4>
              <div className="space-y-2">
                {numPages &&
                  Array.from({ length: numPages }, (_, i) => i + 1).map(
                    (page) => (
                      <div
                        key={page}
                        className={`
                      relative cursor-pointer border-2 rounded-lg overflow-hidden transition-all
                      ${
                        page === pageNumber
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                        onClick={() => goToPage(page)}
                      >
                        <div className="aspect-[1/1.414] bg-gray-100">
                          <Document
                            file={fileUrl}
                            options={options}
                            loading={null}
                          >
                            <Page
                              pageNumber={page}
                              scale={0.15}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                              loading={
                                <div className="flex items-center justify-center h-full">
                                  <Spinner size="sm" />
                                </div>
                              }
                            />
                          </Document>
                        </div>
                        <div
                          className={`
                      absolute bottom-0 left-0 right-0 text-center text-xs py-1
                      ${
                        page === pageNumber
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-600"
                      }
                    `}
                        >
                          {page}
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        )}

        {/* Área principal del documento */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          {isLoading && (
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <Spinner size="lg" />
                <p className="mt-2 text-gray-600">Cargando documento PDF...</p>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                options={options}
                loading={
                  <div className="flex justify-center items-center h-96">
                    <div className="text-center">
                      <Spinner size="lg" />
                      <p className="mt-2 text-gray-600">Cargando PDF...</p>
                    </div>
                  </div>
                }
                error={
                  <div className="flex justify-center items-center h-96 text-red-500">
                    <div className="text-center p-8">
                      <p className="text-lg font-semibold mb-2">
                        Error al cargar el PDF
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        Verifique que el archivo sea válido y esté disponible
                      </p>
                      <Button
                        size="sm"
                        color="primary"
                        onClick={() => window.location.reload()}
                      >
                        Reintentar
                      </Button>
                    </div>
                  </div>
                }
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  onLoadSuccess={onPageLoadSuccess}
                  loading={
                    <div className="flex justify-center items-center h-96">
                      <div className="text-center">
                        <Spinner />
                        <p className="mt-2 text-gray-600">Cargando página...</p>
                      </div>
                    </div>
                  }
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="shadow-md"
                />
              </Document>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de estado */}
      <div className="bg-white border-t border-gray-200 p-2">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <DocumentIconSmall />
              Página {pageNumber} de {numPages}
            </span>
            <span className="flex items-center gap-1">
              <MagnifyingGlassIconSmall />
              {Math.round(scale * 100)}%
            </span>
            {showThumbnails && (
              <span className="flex items-center gap-1 text-green-600">
                <ViewColumnsIconSmall />
                Miniaturas activas
              </span>
            )}
            {isFullscreen && (
              <span className="flex items-center gap-1 text-purple-600">
                <FullscreenIconSmall />
                Pantalla completa
              </span>
            )}
          </div>
          <div className="hidden md:flex items-center gap-1">
            <span>PDF.js Viewer Professional</span>
            <span>•</span>
            <span>Navegación con ← →</span>
            <span>•</span>
            <span>Zoom con + -</span>
          </div>
        </div>
      </div>
    </div>
  );
}

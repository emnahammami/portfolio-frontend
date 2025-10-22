import React, { useEffect, useState } from "react";

import Divider from "./Divider";
import config from "../config/index.json";
import { ICertificate } from "../interfaces.d";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Certificates = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [certificates, setCertificates] = useState<ICertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/certifs/getCertificates`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setCertificates(data);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch certificates"
        );
        // Fallback to config data
        setCertificates(config.certificates.certificates);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const cert = certificates[selectedIndex];

  // Loading state
  if (loading) {
    return (
      <section className="bg-background py-8" id="certifs">
        <div className="container max-w-6xl mx-auto m-8">
          <div className="text-center mb-12">
            <h1 className="w-full my-2 text-4xl sm:text-5xl font-bold text-center text-primary">
              {config.certificates.title}
            </h1>
            <Divider />
            <p className="text-center text-lg text-gray-600 mb-8">
              {config.certificates.subtitle}
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-3 text-gray-600">Loading certificates...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && certificates.length === 0) {
    return (
      <section className="bg-background py-8" id="certifs">
        <div className="container max-w-6xl mx-auto m-8">
          <div className="text-center mb-12">
            <h1 className="w-full my-2 text-4xl sm:text-5xl font-bold text-center text-primary">
              {config.certificates.title}
            </h1>
            <Divider />
            <p className="text-center text-lg text-gray-600 mb-8">
              {config.certificates.subtitle}
            </p>
          </div>
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Failed to load certificates
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-8" id="certifs">
      <div className="container max-w-6xl mx-auto m-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h1 className="w-full my-2 text-4xl sm:text-5xl font-bold text-center text-primary">
            {config.certificates.title}
          </h1>
          <Divider />
          <p className="text-center text-lg text-gray-600 mb-8">
            {config.certificates.subtitle}
          </p>
          {error && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⚠️ Using fallback data: {error}
              </p>
            </div>
          )}
        </div>

        {/* No certificates state */}
        {certificates.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No certificates found
            </h3>
            <p className="text-gray-600">
              No certificates are available at the moment.
            </p>
          </div>
        )}

        {/* Certificates Grid */}
        {certificates.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {certificates.map((certificate, index) => (
              <div
                // eslint-disable-next-line no-underscore-dangle
                key={certificate._id}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 hover:shadow-lg ${
                  selectedIndex === index
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-gray-200 hover:border-primary/50"
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                <div className="text-center">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                    {certificate.titre}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {certificate.organisme}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(certificate.dateObtention).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                      }
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected Certificate Details */}
        {cert && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {cert.titre}
              </h2>
              <p className="text-lg text-gray-600 mb-2">{cert.organisme}</p>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(cert.dateObtention).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Description */}
            {cert.description && (
              <div className="mb-6">
                <p className="text-gray-700 text-center leading-relaxed">
                  {cert.description}
                </p>
              </div>
            )}

            {/* Skills */}
            {cert.skills && cert.skills.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                  Skills & Technologies
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {cert.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Images */}
            {cert.images && cert.images.length > 0 && (
              <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cert.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg overflow-hidden shadow-md border border-gray-200 hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={img}
                        alt={`${cert.titre} - certificate ${idx + 1}`}
                        className="w-full h-auto object-contain bg-gray-50"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/assets/images/logo.png"; // Fallback image
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Link */}
            {cert.lien && cert.lien.trim() !== "" && (
              <div className="text-center">
                <a
                  href={cert.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  View Certificate Details
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;

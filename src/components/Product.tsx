import React, { useEffect, useState } from "react";

import Divider from "./Divider";
import config from "../config/index.json";

// Interface pour le projet
interface IProject {
  _id: string;
  titre: string;
  description: string;
  technologies: string[];
  lienCode: string;
  images: string[];
  video?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Product = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`${API_URL}/projets/getProjects`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch projects");
        // Fallback to config data if available
        if (config.product?.items) {
          const fallbackProjects = config.product.items.map((item, index) => ({
            _id: `fallback-${index}`,
            titre: item.title,
            description: item.description,
            technologies: ["React", "Next.js", "TypeScript"],
            lienCode: "#",
            images: [item.img],
          }));
          setProjects(fallbackProjects);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Loading state with skeleton
  if (loading) {
    return (
      <section className="bg-background py-8" id="product">
        <div className="container max-w-6xl mx-auto m-8">
          {/* Section Title Skeleton */}
          <div className="text-center mb-12">
            <div className="h-16 bg-gray-200 rounded-lg mx-auto mb-4 w-96 animate-pulse"></div>
            <Divider />
            <div className="h-6 bg-gray-200 rounded mx-auto w-64 animate-pulse"></div>
          </div>

          {/* Content Skeleton */}
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6 mt-20">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Loading indicator */}
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-3 text-gray-600">Loading projects...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && projects.length === 0) {
    return (
      <section className="bg-background py-8" id="product">
        <div className="container max-w-6xl mx-auto m-8">
          <div className="text-center mb-12">
            <h1 className="w-full my-2 text-4xl sm:text-5xl font-bold text-center text-primary">
              My Projects
            </h1>
            <Divider />
            <p className="text-center text-lg text-gray-600 mb-8">
              Showcasing my latest work and achievements
            </p>
          </div>
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load projects</h3>
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

  // No projects state
  if (projects.length === 0 && !loading) {
    return (
      <section className="bg-background py-8" id="product">
        <div className="container max-w-6xl mx-auto m-8">
          <div className="text-center mb-12">
            <h1 className="w-full my-2 text-4xl sm:text-5xl font-bold text-center text-primary">
              My Projects
            </h1>
            <Divider />
            <p className="text-center text-lg text-gray-600 mb-8">
              Showcasing my latest work and achievements
            </p>
          </div>
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600">No projects are available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const project = projects[selectedProjectIndex];

  return (
    <section className="bg-background py-8" id="product">
      <div className="container max-w-6xl mx-auto m-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h1 className="w-full my-2 text-4xl sm:text-5xl font-bold text-center text-primary">
            My Projects
          </h1>
          <Divider />
          <p className="text-center text-lg text-gray-600 mb-8">
            Showcasing my latest work and achievements
          </p>
          {error && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⚠️ Using fallback data: {error}
              </p>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {projects.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((proj, index) => (
              <div
                key={proj._id}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 hover:shadow-lg ${
                  selectedProjectIndex === index
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
                onClick={() => setSelectedProjectIndex(index)}
              >
                <div className="text-center">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                    {proj.titre}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {proj.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        +{proj.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected Project Details */}
        {project && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {project.titre}
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Images */}
            {project.images && project.images.length > 0 && (
              <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg overflow-hidden shadow-md border border-gray-200 hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={img}
                        alt={`${project.titre} - image ${idx + 1}`}
                        className="w-full h-auto object-contain bg-gray-50"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/assets/images/logo.png'; // Fallback image
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Link */}
            {project.lienCode && project.lienCode.trim() !== "" && project.lienCode !== "#" && (
              <div className="text-center">
                <a
                  href={project.lienCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Source Code
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Product;

/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';


import Divider from './Divider';

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const Product = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/projets/getProjects`);
        const data = await res.json();
        console.log("Réponse API:", data);
        setProjects(data);
      } catch (err) {
        console.error("Erreur API:", err);
        setError("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProjects();
  }, []);
  

  if (loading)
    return <p className="text-center text-gray-500">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const project = projects[selectedProjectIndex];

  return (
    <section className="bg-background py-8" id="product">
      <div className="container max-w-5xl mx-auto m-8">
        <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-primary">
          {project?.titre}
        </h1>
        <Divider />
        <div className="flex flex-wrap">
          <div className="w-5/6 sm:w-1/2 p-6 mt-20">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              {project?.description}
            </h3>
            <p className="text-gray-600">
              Technologies: {project?.technologies.join(', ')}
            </p>
            {project?.lienCode && (
              <p className="mt-2">
                <a
                  href={project.lienCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Voir le code
                </a>
              </p>
            )}
          </div>
          <div className="w-full sm:w-1/2 p-6">
            {(project?.images.length as any) > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project?.images.map((img, index) => (
                  <img
                    key={index}
                    className="h-full w-full object-cover rounded-lg shadow-lg"
                    src={img}
                    alt={`${project?.titre} - Image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation entre les projets */}
        {projects.length > 1 && (
          <div className="text-center mt-6">
            <button
              className="px-4 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark"
              onClick={() =>
                setSelectedProjectIndex(
                  (prevIndex) => (prevIndex + 1) % projects.length
                )
              }
            >
              Voir un autre projet
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Product;

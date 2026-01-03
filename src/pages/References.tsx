import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BONE_GROUPS } from '@/types/species';

export default function References() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold tracking-wide">References & Attribution</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-8 space-y-10">
        {/* Intro */}
        <section className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            This application uses 3D forelimb models from the{' '}
            <span className="text-foreground font-medium">Forelimb Homology Project</span>{' '}
            (MorphoSource Project ID: <span className="text-primary font-mono">0000C1122</span>, Public), 
            created as an educational resource for demonstrating vertebrate forelimb homology.
          </p>
        </section>

        {/* Divider */}
        <hr className="border-border" />

        {/* Primary Citation */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Primary Citation
          </h2>
          <div className="bg-card rounded-xl p-5 border border-border space-y-3">
            <p className="text-foreground font-medium">
              Blackburn, D.C., et al. (2024).
            </p>
            <p className="text-muted-foreground italic leading-relaxed">
              Increasing the impact of vertebrate scientific collections through 3D-imaging: 
              the openVertebrate (oVert) Thematic Collections Network.
            </p>
            <p className="text-foreground">
              <span className="font-medium">BioScience</span>, 74, 169–186.
            </p>
            <a
              href="https://doi.org/10.1093/biosci/biad120"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-primary hover:underline text-sm"
            >
              https://doi.org/10.1093/biosci/biad120
            </a>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-border" />

        {/* Project Information */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Project Information
          </h2>
          <div className="bg-card rounded-xl p-5 border border-border">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Project</dt>
                <dd className="text-foreground font-medium">Forelimb Homology Project</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">MorphoSource ID</dt>
                <dd className="text-primary font-mono">0000C1122</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Creator & Manager</dt>
                <dd className="text-foreground">Jaimi Gray</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Media</dt>
                <dd className="text-foreground">28 specimens</dd>
              </div>
              <div className="flex justify-between items-start">
                <dt className="text-muted-foreground">Source</dt>
                <dd>
                  <a
                    href="https://www.morphosource.org/projects/0000C1122"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-right"
                  >
                    morphosource.org/projects/0000C1122
                  </a>
                </dd>
              </div>
              <div className="flex justify-between items-start">
                <dt className="text-muted-foreground">Funding</dt>
                <dd className="text-foreground text-right">NSF DBI-1701714 ("oVert: TCN" parent grant)</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-border" />

        {/* Color Coding */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Color Coding
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The following color scheme is used to represent homologous skeletal elements across species:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BONE_GROUPS.map((bone) => (
              <div
                key={bone.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-card border border-border"
              >
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: bone.color,
                    boxShadow: `0 0 12px ${bone.color}60`,
                  }}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground">{bone.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground font-mono">{bone.color}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-border" />

        {/* Model Details */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Model Details
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Mesh files were generated from CT data and surface scans and originally produced 
            for a forelimb homology teaching resource, including associated Sketchfab scenes. 
            Some forelimbs in the collection may be repositioned and/or mirrored to support 
            comparative visualization.
          </p>
        </section>

        {/* Divider */}
        <hr className="border-border" />

        {/* Modifications */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Modifications
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Models were modified in <span className="text-foreground font-medium">Blender</span> to 
            reduce polygon count and to add rigging and alignment for real-time, web-based viewing 
            and interactive use. All modifications preserve the original educational intent and 
            color-based homology mappings.
          </p>
        </section>

        {/* Divider */}
        <hr className="border-border" />

        {/* Access Date */}
        <section className="space-y-4 pb-8">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Access Date
          </h2>
          <p className="text-muted-foreground">
            All models were downloaded on <span className="text-foreground font-medium">January 2, 2026</span>.
          </p>
        </section>
      </main>
    </div>
  );
}

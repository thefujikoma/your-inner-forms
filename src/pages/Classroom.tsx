import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Target, Brain, FlaskConical, GraduationCap, Ruler, Download, Dna } from "lucide-react";

export default function Classroom() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Classroom Activity</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Design a New Forelimb</h1>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📘</span> Overview
          </h2>
          <div className="bg-card border border-border rounded-xl p-6 space-y-4 text-muted-foreground">
            <p>
              This activity extends the <strong className="text-foreground">Your Inner Forms</strong> experience into a hands-on evolutionary biology lesson. Students use the app to observe how a shared set of forelimb bones appears across different animals, then apply those observations to design a new limb for a fictional organism.
            </p>
            <p>
              The goal is not artistic perfection, but <strong className="text-foreground">biological reasoning</strong>: recognizing homology, understanding how structure supports function, and explaining how natural selection could favor certain forms over time.
            </p>
            <p className="text-sm text-primary">
              This activity is well-suited for middle school and early high school life science courses.
            </p>
          </div>
        </section>

        {/* Learning Objectives */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Learning Objectives
          </h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground mb-4">By completing this activity, students will:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm">1</span>
                </span>
                <span className="text-foreground">Identify homologous forelimb bones shared across vertebrates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm">2</span>
                </span>
                <span className="text-foreground">Compare how bone proportions change to support different functions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm">3</span>
                </span>
                <span className="text-foreground">Apply evolutionary reasoning to explain structural adaptations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-sm">4</span>
                </span>
                <span className="text-foreground">Communicate scientific ideas through labeled diagrams and written explanations</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How the App Supports Learning */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            How the App Supports Learning
          </h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground mb-4">Using <strong className="text-foreground">Your Inner Forms</strong>, students can:</p>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Overlay different animal forelimbs on their own hand
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Observe which bones remain consistent across species
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                See how bones lengthen, shorten, or fuse over evolutionary time
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                Use color-coded bones to support accurate labeling
              </li>
            </ul>
            <p className="text-muted-foreground mt-4 text-sm">
              The app acts as an interactive reference, helping students ground their designs in real biological structures rather than guesswork.
            </p>
          </div>
        </section>

        {/* Activity Summary */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-primary" />
            Activity Summary
            <span className="text-sm font-normal text-muted-foreground">(Student-Facing)</span>
          </h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-medium">1</span>
                <span className="text-foreground">Explore multiple animal forelimbs using the app</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-medium">2</span>
                <span className="text-foreground">Identify which bones stay the same and which change</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-medium">3</span>
                <span className="text-foreground">Design a new forelimb for an imaginary animal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-medium">4</span>
                <span className="text-foreground">Label and color the bones using what you observed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-medium">5</span>
                <span className="text-foreground">Write a paragraph explaining how the limb works and why it would be favored by evolution</span>
              </li>
            </ol>
            <p className="text-sm text-muted-foreground mt-4 italic">
              (See downloadable worksheet for full instructions.)
            </p>
          </div>
        </section>

        {/* Teacher Notes */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Teacher Notes
            <span className="text-sm font-normal text-muted-foreground">(Quick Use)</span>
          </h2>
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div>
              <p className="text-muted-foreground mb-2">This activity works well after introducing:</p>
              <ul className="text-foreground space-y-1 ml-4">
                <li>• Evolution by natural selection</li>
                <li>• Homologous vs. analogous structures</li>
              </ul>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p>• Students may work individually or in pairs</p>
              <p>• Artistic ability should not be graded — <strong className="text-foreground">reasoning should be prioritized</strong></p>
              <p>• Encourage students to justify changes using function, not preference</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-2">Estimated time:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 10–15 min app exploration</li>
                <li>• 20–30 min drawing and labeling</li>
                <li>• 10 min written reflection</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Assessment Guidance */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-primary" />
            Assessment Guidance
            <span className="text-sm font-normal text-muted-foreground">(Rubric Overview)</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-2">Conceptual Accuracy</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Uses the same basic bone set seen in real animals</li>
                <li>• Avoids inventing new bones</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-2">Structure–Function Reasoning</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Limb design clearly supports a specific function</li>
                <li>• Bone proportions match the stated use (e.g., longer digits for flying)</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-2">Evolutionary Explanation</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Explains why the design would be favored over time</li>
                <li>• References efficiency, survival, or environmental advantage</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-2">Communication</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Bones are labeled and color-coded clearly</li>
                <li>• The written paragraph is coherent and uses scientific language</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Download Worksheet */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Download the Worksheet
          </h2>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <p className="text-muted-foreground mb-4">
              Use the worksheet below to complete the activity alongside the app:
            </p>
            <a
              href="/YourInnerFormsWorksheet.pdf"
              download
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Your Inner Forms – Design a New Forelimb Worksheet
            </a>
            <p className="text-xs text-muted-foreground mt-3">(Printable PDF)</p>
          </div>
        </section>

        {/* Standards Alignment */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Dna className="w-5 h-5 text-primary" />
            Standards Alignment
            <span className="text-sm font-normal text-muted-foreground">(NGSS – Middle School)</span>
          </h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground mb-4">This activity supports the following Next Generation Science Standards:</p>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4">
                <p className="font-medium text-foreground">MS-LS4-2</p>
                <p className="text-sm text-muted-foreground">Apply scientific ideas to construct an explanation for anatomical similarities among organisms</p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <p className="font-medium text-foreground">MS-LS4-6</p>
                <p className="text-sm text-muted-foreground">Use evidence to explain how adaptations affect survival and reproduction</p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <p className="font-medium text-foreground">MS-LS1-4</p>
                <p className="text-sm text-muted-foreground">Analyze how structures contribute to an organism's function</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 text-center border-t border-border">
        <Link to="/" className="text-sm text-primary hover:underline">
          ← Back to Home
        </Link>
      </footer>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Database,
  Mail,
  Phone,
  Settings,
  TrendingUp,
  Users,
  Building2,
  Calculator,
  BarChart3,
  RefreshCw,
  Menu,
  X
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect, useCallback } from "react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name is required"),
  role: z.string().min(2, "Role is required"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message must be less than 500 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // API call will be handled by backend agent
      console.log("Form submission:", data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Fixed header height
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -80px 0px", // Account for fixed header
      threshold: 0.3
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = ["hero", "features", "process", "contact"];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-ds-2 py-ds-1">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection("hero")}
              className="font-heading text-xl font-semibold text-primary hover:opacity-80 transition-opacity"
            >
              StructuPath
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-ds-2">
              <Button
                variant={activeSection === "hero" ? "secondary" : "ghost"}
                onClick={() => scrollToSection("hero")}
                className="font-body"
              >
                Home
              </Button>
              <Button
                variant={activeSection === "features" ? "secondary" : "ghost"}
                onClick={() => scrollToSection("features")}
                className="font-body"
              >
                Features
              </Button>
              <Button
                variant={activeSection === "process" ? "secondary" : "ghost"}
                onClick={() => scrollToSection("process")}
                className="font-body"
              >
                How It Works
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="font-body"
              >
                Get Demo
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-ds-1 pb-ds-2 border-t border-border">
              <div className="flex flex-col gap-1 pt-ds-2">
                <Button
                  variant={activeSection === "hero" ? "secondary" : "ghost"}
                  onClick={() => scrollToSection("hero")}
                  className="font-body justify-start w-full"
                >
                  Home
                </Button>
                <Button
                  variant={activeSection === "features" ? "secondary" : "ghost"}
                  onClick={() => scrollToSection("features")}
                  className="font-body justify-start w-full"
                >
                  Features
                </Button>
                <Button
                  variant={activeSection === "process" ? "secondary" : "ghost"}
                  onClick={() => scrollToSection("process")}
                  className="font-body justify-start w-full"
                >
                  How It Works
                </Button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="font-body justify-start w-full mt-ds-1"
                >
                  Get Demo
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 pb-ds-6 px-ds-2">
        <div className="max-w-6xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-6xl font-semibold text-foreground mb-ds-3">
              Transform Steel Construction with{" "}
              <span className="text-primary">AI Automation</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-muted-foreground mb-ds-4 max-w-3xl mx-auto">
              Streamline your steel construction workflow with intelligent automation.
              Reduce project timelines by 40%, eliminate estimation errors, and maximize profitability
              through data-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-ds-2 justify-center items-center">
              <Button
                size="lg"
                className="font-body px-ds-4 py-ds-2"
                onClick={() => scrollToSection("contact")}
              >
                Get Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="font-body px-ds-4 py-ds-2">
                Download Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-ds-6 bg-muted/20">
        <div className="max-w-6xl mx-auto px-ds-2">
          <div className="text-center mb-ds-5">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-ds-2">
              Steel Construction Challenges Are Holding You Back
            </h2>
            <p className="font-body text-muted-foreground max-w-3xl mx-auto">
              Traditional methods create bottlenecks that cost time, money, and competitive advantage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-ds-3">
            <Card className="text-center p-ds-3">
              <CardHeader>
                <Clock className="h-12 w-12 text-destructive mx-auto mb-ds-2" />
                <CardTitle className="font-heading text-xl">Manual Estimating</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-body">
                  Hours spent on calculations with 15-25% estimation errors leading to budget overruns and delayed projects
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-ds-3">
              <CardHeader>
                <Database className="h-12 w-12 text-destructive mx-auto mb-ds-2" />
                <CardTitle className="font-heading text-xl">Data Silos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-body">
                  Disconnected systems prevent real-time visibility into project status, resource allocation, and cost tracking
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-ds-3">
              <CardHeader>
                <Users className="h-12 w-12 text-destructive mx-auto mb-ds-2" />
                <CardTitle className="font-heading text-xl">Skills Gap</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-body">
                  Experienced estimators are retiring while new talent lacks industry-specific knowledge and best practices
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-ds-6">
        <div className="max-w-6xl mx-auto px-ds-2">
          <div className="grid lg:grid-cols-2 gap-ds-5 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-ds-3">
                StructuPath AI: Your Complete Steel Construction Platform
              </h2>
              <p className="font-body text-muted-foreground mb-ds-4">
                Our AI-powered platform eliminates manual bottlenecks and connects every aspect of your steel construction workflow.
                From initial estimates to project completion, experience unprecedented accuracy and efficiency.
              </p>

              <div className="space-y-ds-2">
                <div className="flex items-start gap-ds-2">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-body font-medium text-foreground">95% Estimation Accuracy</p>
                    <p className="font-body text-sm text-muted-foreground">AI algorithms trained on 50,000+ steel projects</p>
                  </div>
                </div>
                <div className="flex items-start gap-ds-2">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-body font-medium text-foreground">40% Faster Project Delivery</p>
                    <p className="font-body text-sm text-muted-foreground">Automated workflows and real-time coordination</p>
                  </div>
                </div>
                <div className="flex items-start gap-ds-2">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-body font-medium text-foreground">25% Cost Reduction</p>
                    <p className="font-body text-sm text-muted-foreground">Optimized material usage and waste elimination</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-ds-4">
              <div className="space-y-ds-3">
                <div className="bg-background rounded-lg p-ds-3 border border-border">
                  <div className="flex items-center gap-ds-2 mb-ds-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="font-body font-medium">Real-time Analytics</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-3/4 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-background rounded-lg p-ds-3 border border-border">
                  <div className="flex items-center gap-ds-2 mb-ds-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <span className="font-body font-medium">Automated Processing</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-5/6 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-background rounded-lg p-ds-3 border border-border">
                  <div className="flex items-center gap-ds-2 mb-ds-2">
                    <Database className="h-5 w-5 text-primary" />
                    <span className="font-body font-medium">Integrated Systems</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-4/5 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-ds-6 bg-muted/20">
        <div className="max-w-6xl mx-auto px-ds-2">
          <div className="text-center mb-ds-5">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-ds-2">
              Complete Steel Construction Automation
            </h2>
            <p className="font-body text-muted-foreground max-w-3xl mx-auto">
              Four integrated modules that transform every aspect of your steel construction workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-ds-3">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-ds-2">
                <Calculator className="h-12 w-12 text-primary mx-auto mb-ds-2" />
                <CardTitle className="font-heading text-lg">AI Estimating</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-body text-sm">
                  Generate accurate estimates in minutes with AI-powered analysis of drawings, specifications, and historical data
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-ds-2">
                <Building2 className="h-12 w-12 text-primary mx-auto mb-ds-2" />
                <CardTitle className="font-heading text-lg">Project Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-body text-sm">
                  Track progress, manage resources, and coordinate teams with real-time dashboards and automated reporting
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-ds-2">
                <RefreshCw className="h-12 w-12 text-primary mx-auto mb-ds-2" />
                <CardTitle className="font-heading text-lg">Data Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-body text-sm">
                  Seamlessly integrate with existing ERP, accounting, and CAD systems for unified data management
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-ds-2">
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-ds-2" />
                <CardTitle className="font-heading text-lg">Training & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-body text-sm">
                  Upskill your team with AI-guided training and gain insights through advanced analytics and reporting
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-ds-6">
        <div className="max-w-6xl mx-auto px-ds-2">
          <div className="text-center mb-ds-5">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-ds-2">
              Trusted by Industry Leaders
            </h2>
            <p className="font-body text-muted-foreground">
              Join 500+ steel construction companies already transforming their operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-ds-4 mb-ds-5">
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-primary mb-ds-1">95%</div>
              <p className="font-body text-muted-foreground">Estimation Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-primary mb-ds-1">$2.3M</div>
              <p className="font-body text-muted-foreground">Average Annual Savings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-heading font-bold text-primary mb-ds-1">40%</div>
              <p className="font-body text-muted-foreground">Faster Project Delivery</p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-ds-4 border border-border">
            <blockquote className="text-center">
              <p className="font-body text-lg text-foreground mb-ds-3">
                &ldquo;StructuPath reduced our estimation time from days to hours while improving accuracy by 30%.
                The ROI was evident within the first quarter of implementation.&rdquo;
              </p>
              <footer className="font-body text-muted-foreground">
                <strong>Sarah Chen</strong> - Project Director, Steel Dynamics Inc.
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-ds-6 bg-muted/20">
        <div className="max-w-6xl mx-auto px-ds-2">
          <div className="text-center mb-ds-5">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-ds-2">
              How StructuPath Works
            </h2>
            <p className="font-body text-muted-foreground">
              Get started in 4 simple steps and see results immediately
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-ds-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading text-2xl font-bold mx-auto mb-ds-2">
                1
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-ds-1">Upload Plans</h3>
              <p className="font-body text-sm text-muted-foreground">
                Upload your CAD drawings and project specifications to our secure platform
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading text-2xl font-bold mx-auto mb-ds-2">
                2
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-ds-1">AI Analysis</h3>
              <p className="font-body text-sm text-muted-foreground">
                Our AI analyzes materials, labor requirements, and generates detailed estimates
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading text-2xl font-bold mx-auto mb-ds-2">
                3
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-ds-1">Review & Adjust</h3>
              <p className="font-body text-sm text-muted-foreground">
                Review AI-generated estimates and make adjustments based on your expertise
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading text-2xl font-bold mx-auto mb-ds-2">
                4
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-ds-1">Execute & Track</h3>
              <p className="font-body text-sm text-muted-foreground">
                Use integrated project management tools to execute and track progress in real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-ds-6">
        <div className="max-w-4xl mx-auto px-ds-2">
          <div className="text-center mb-ds-5">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-ds-2">
              Ready to Transform Your Steel Construction Business?
            </h2>
            <p className="font-body text-muted-foreground">
              Schedule a personalized demo and see how StructuPath can optimize your operations
            </p>
          </div>

          <Card className="p-ds-4">
            {submitSuccess ? (
              <div className="text-center py-ds-4">
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-ds-3" />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-ds-2">
                  Thank You for Your Interest!
                </h3>
                <p className="font-body text-muted-foreground mb-ds-3">
                  We&apos;ve received your request and will contact you within 24 hours to schedule your personalized demo.
                </p>
                <Button onClick={() => setSubmitSuccess(false)}>
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-ds-3">
                  <div className="grid md:grid-cols-2 gap-ds-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body">Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} className="font-body" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body">Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} className="font-body" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-ds-3">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body">Company Name</FormLabel>
                          <FormControl>
                            <Input {...field} className="font-body" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body">Your Role</FormLabel>
                          <FormControl>
                            <Input {...field} className="font-body" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body">Message</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-body"
                            placeholder="Tell us about your steel construction projects and how we can help..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full font-body"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Get Your Demo"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            )}
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-ds-5 border-t border-border">
        <div className="max-w-6xl mx-auto px-ds-2">
          <div className="grid md:grid-cols-4 gap-ds-4 mb-ds-4">
            <div>
              <div className="font-heading text-xl font-semibold text-primary mb-ds-2">
                StructuPath
              </div>
              <p className="font-body text-sm text-muted-foreground">
                Transforming steel construction through AI automation and intelligent workflow optimization.
              </p>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-foreground mb-ds-2">Solutions</h3>
              <ul className="space-y-1 font-body text-sm text-muted-foreground">
                <li>AI Estimating</li>
                <li>Project Management</li>
                <li>Data Integration</li>
                <li>Team Training</li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-foreground mb-ds-2">Company</h3>
              <ul className="space-y-1 font-body text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Case Studies</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-foreground mb-ds-2">Contact</h3>
              <div className="space-y-2 font-body text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@structupath.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>1-800-STRUCT</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-ds-3 text-center">
            <p className="font-body text-sm text-muted-foreground">
              © 2024 StructuPath. All rights reserved. | Revolutionizing steel construction with AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
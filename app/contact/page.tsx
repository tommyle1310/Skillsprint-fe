"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Safari } from "@/components/magicui/safari";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { TextAnimate } from "@/components/magicui/text-animate";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "hello@skillsprint.com",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      details: "123 Learning Street",
      description: "San Francisco, CA 94102"
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <TextAnimate className="text-3xl font-bold text-slate-900 mb-4" animation="fadeIn">
            Message Sent!
          </TextAnimate>
          <p className="text-lg text-slate-600 mb-6">
            Thank you for reaching out. We&apos;ll get back to you within 24 hours.
          </p>
          <ShimmerButton onClick={() => setIsSubmitted(false)}>
            Send Another Message
          </ShimmerButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <TextAnimate className="text-5xl md:text-6xl font-bold text-slate-900 mb-6" animation="fadeIn">
            Get in Touch
          </TextAnimate>
          <TextAnimate className="text-xl text-slate-600 max-w-3xl mx-auto" animation="fadeIn" delay={0.2}>
            Have questions about our courses? Want to discuss a partnership? 
            We&apos;d love to hear from you. Let&apos;s start a conversation.
          </TextAnimate>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="relative">
              <BorderBeam />
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  
                  <ShimmerButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </div>
                    )}
                  </ShimmerButton>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Info & Safari Browser */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="relative">
              <BorderBeam />
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-blue-600">
                          {info.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{info.title}</h3>
                        <p className="text-slate-600 font-medium">{info.details}</p>
                        <p className="text-sm text-slate-500">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Safari Browser Demo */}
            <div className="relative">
              <BorderBeam />
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Experience Our Platform</h3>
                <div className="flex justify-center">
                  <Safari
                    url="skillsprint.com"
                    imageSrc="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=700&fit=crop"
                    width={400}
                    height={250}
                    mode="simple"
                  />
                </div>
                <p className="text-center text-sm text-slate-600 mt-4">
                  Preview of our learning platform
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600">Quick answers to common questions</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <BorderBeam />
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-3">How does sequential learning work?</h3>
                <p className="text-slate-600">
                  Our platform ensures you master each concept before moving to the next, 
                  building a solid foundation for advanced topics.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <BorderBeam />
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Can I access courses on mobile?</h3>
                <p className="text-slate-600">
                  Yes! Our platform is fully responsive and works perfectly on all devices, 
                  including smartphones and tablets.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <BorderBeam />
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-3">What if I need help with a course?</h3>
                <p className="text-slate-600">
                  We provide 24/7 support through our community forums, 
                  live chat, and dedicated support team.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <BorderBeam />
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Do you offer certificates?</h3>
                <p className="text-slate-600">
                  Yes! Complete any course to earn a certificate that you can 
                  share on LinkedIn and add to your resume.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

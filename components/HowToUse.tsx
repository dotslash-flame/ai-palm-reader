import { motion } from 'framer-motion';
import { Camera, Sparkles, Eye, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Capture or Upload",
    description: "Take a photo of your palm or upload an existing image. Your photo stays private in your browser.",
    color: "from-violet-500 to-purple-600"
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Hand Validation",
    description: "Our AI validates that your palm is clearly visible and ready for accurate analysis.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Mystical Reading",
    description: "Gemini AI analyzes your palm lines and provides personalized insights about your destiny.",
    color: "from-amber-500 to-orange-600"
  },
];

const HowToUse: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient and subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)]"></div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the secrets of your palm in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Connecting line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-12 h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-10">
                  <ArrowRight className="absolute -right-2 -top-2 w-4 h-4 text-gray-400" />
                </div>
              )}

              {/* Card */}
              <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                {/* Step number */}
                <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent rounded-b-2xl"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full text-purple-700 font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Ready to discover your destiny?</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToUse;
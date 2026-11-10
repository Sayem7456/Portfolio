const SUMMARY_TEXT = `Academic & Research Background:
Education: Recent Computer Science and Engineering graduate from United International University.

Research Focus: Deep learning, machine learning, medical image analysis, explainable AI, trustworthy AI, computer vision, multimodal learning, large language models, Retrieval-Augmented Generation, and time-series analysis.

Publications: Four conference papers published, along with a research-related book chapter. Two Q1 journal manuscripts are submitted and under review (ACAT-UE and GDDI), one Q1 journal manuscript (BS-Net) is in preparation, and CausalMask-XAI is an ongoing research project.

Q1 Manuscript in Preparation: Curriculum-Guided Spatial Attention Resolves Multi-Annotator Label Ambiguity in Thoracic Disease Screening.

Proposed BS-Net, a clinically grounded multi-label chest radiograph classification architecture based on DenseNet-121 and a custom Bottleneck Spatial Attention Module. The model uses supervised spatial attention with clinically validated bounding-box priors to reduce shortcut learning and improve interpretability.

BS-Net combines binary cross-entropy classification loss with soft Dice attention-supervision loss through a dual-objective optimization strategy. On a diverse test set of 3,000 chest X-ray images, the model achieved a Macro-Average AUC of 0.9607, Mean Average Precision of 0.6506, Pointing Game Accuracy of 84.87%, and Mean IoU of 0.4941.

The study demonstrated that unconstrained attention slightly reduced baseline performance, while clinically supervised attention improved classification and localization, including approximately 1.5% AUC improvements for Fibrosis and Calcification. Robustness testing with synthetic out-of-distribution artifacts produced a low false-positive rate of 0.0156, demonstrating resistance to shortcut features such as text markers and hospital tokens.

Submitted Q1 Journal (under review at Journal of Visual Communication and Image Representation, Elsevier): Gradient-Decoupled Dual-Stream Learning for Edge-Efficient Melanoma Classification (GDDI).

Developed a lightweight dual-stream MobileNetV3 framework with approximately 2 million parameters for melanoma detection. The model processes global lesion shape at 224×224 resolution and local texture information at 128×128 resolution.

Introduced Gradient-Decoupled Modality Isolation, a training strategy that trains the global and local streams independently before combining their predictions through inference-time ensemble fusion. This approach reduces modality collapse without introducing additional architectural complexity.

Evaluated using patient-level five-fold cross-validation on the highly imbalanced ISIC 2020 dataset, the framework achieved a mean AUC-ROC of 0.8975 ± 0.0150 compared with 0.8872 for the joint-training baseline. It also achieved a Partial AUC of 0.9850 in the high-sensitivity screening region, accuracy of 90.2%, and specificity of 90.6%, while reducing false-positive predictions.

Capstone Project: Advanced Deep Learning Techniques for Classifying and Assessing the Severity of Lung Diseases using Chest X-ray Images.

Other Research Work: Adaptive Fault Reduction Algorithm research using machine learning for electrical fault detection, achieving approximately 99.79% classification accuracy.

Additional research experience includes brain tumour classification using channel attention, elderly movement-intensity prediction using environmental sensor data, medical image explainability, retinal vessel segmentation, and ride-sharing trend analysis.

Career & Professional Status:
Current Role: AI Engineer at Ethics Advance Technology Limited, Dhaka, Bangladesh.

Responsibilities: Designing, developing, and integrating AI-powered systems for real-world educational, institutional, and healthcare applications. Two systems are in production with real users (the AI-powered Medical Education Platform and ASTER), and he built most of the AI features in both. Responsibilities include LLM and RAG development, computer vision, AI system architecture, FastAPI backend integration, database design, asynchronous job processing, GPU workload management, and production deployment.

Career Direction: Combining applied AI engineering with academic research to build expertise in trustworthy AI, medical imaging, educational AI, LLM systems, and production-ready machine learning applications.

Production System 1: AI-Powered Medical Education Platform (AI-LMS), in production with real users at EATL.

The AI-LMS is a comprehensive institutional educational platform designed primarily for medical education. It combines learning management, RAG-based medical question answering over textbooks, AI-generated educational content, automated assessment, online examination, real-time AI viva, AI clinical patient practice simulation, AI-based live exam proctoring using computer vision, radiology learning, presentation generation, personalized learning, and academic analytics.

Core AI-LMS Features:

AI Question Generation: Generates MCQ, descriptive, adaptive, short-answer, structured essay, and clinical scenario-based questions from uploaded academic materials.

AI Viva System: Conducts interactive text and voice-based viva examinations, generates follow-up questions, evaluates answers, and produces performance summaries.

AI Presentation Generation: Creates structured educational presentations from academic documents using background processing and dedicated GPU job queues.

AI Evaluation: Evaluates student answers using configurable rubrics and generates scores, feedback, strengths, weaknesses, and improvement recommendations.

Personalized Learning Paths: Recommends chapters, topics, learning materials, practice questions, and difficulty levels based on student performance.

Hybrid Retrieval System: Uses BM25 keyword search, dense semantic retrieval, PostgreSQL, PGVector, metadata filtering, semantic chunking, and context ranking.

Online Examination: Supports large student cohorts, structured examinations, question management, student submissions, performance tracking, and administrative controls.

AI Usage Management: Tracks token consumption, model usage, processing costs, and available institutional AI balances.

Production Architecture: Uses FastAPI, Next.js, PostgreSQL, SQLAlchemy, Redis, WebSockets, background workers, distributed locks, dedicated GPU queues, and asynchronous processing.

Technical & Project Experience:

OpenCode Engineering Skills: Created and maintain an open-source engineering skill package for AI coding agents. The package provides reusable, role-specific engineering instructions for Python development, FastAPI, Next.js, UI/UX design, SQLAlchemy, PostgreSQL, testing, debugging, security review, code review, production readiness, AI system architecture, and general system architecture.

The project includes skill validation, installation utilities, cross-platform setup, prompt optimization, context reduction, and token-saving workflows. Its objective is to make AI-assisted software engineering more consistent, architecture-aware, secure, and efficient.

Cheating Risk Analysis: Developed a Python-based cheating-risk analysis service using computer vision and AI-powered behavioral assessment.

The system supports real-time webcam and video analysis using MediaPipe and YOLOv8, suspicious-behavior detection, AI-powered risk assessment, cheating-probability scoring, activity timelines, and automated summaries.

The production architecture includes FastAPI, asynchronous SQLAlchemy, PostgreSQL, Redis, Celery background workers, Prometheus monitoring, AWS S3 integration, OpenAI-based analysis, caching, and scalable worker processing.

AI Research Academy: Developed an educational platform for artificial intelligence and machine learning research using Next.js.

The platform provides structured learning tracks in computer vision and deep learning, interactive educational content, research-focused documentation, and organized learning resources for students and aspiring AI researchers.

Face Detector — Real-Time Three-Person Desktop Alert: Developed a local face-recognition and monitoring system for a fixed webcam.

The system enrolls three specific individuals, detects and recognizes them in real time, and sends desktop popup notifications when one of the enrolled people appears. It is designed for lightweight, local, and privacy-conscious execution.

Resume-Optimizer-AI: Developed an AI-powered resume optimization application.

Users can upload a resume and provide a target job description. The system analyzes the resume against the job requirements and generates suggestions for improving relevance, structure, wording, skills alignment, and applicant-tracking-system compatibility.

Strong hands-on expertise in PyTorch, FastAPI, Next.js, PostgreSQL, SQLAlchemy, PGVector, Redis, Celery, computer vision, LLM applications, RAG systems, medical image analysis, multimodal learning, AI infrastructure, and production debugging.

Future Goals:
Short-Term:

Strengthen academic and professional research profiles through Q1 journal publications, production-grade AI systems, open-source contributions, and international research collaboration.

Prepare for PTE and apply for research-based master's or MPhil opportunities, primarily in Australia, while considering suitable alternatives in Europe and Asia.

Continue developing expertise in medical image analysis, trustworthy AI, explainable AI, LLMs, RAG, and production-oriented AI engineering.

Mid-Term:

Pursue impactful research during a research-based master's or MPhil program.

Publish additional Q1 journal papers and present research at internationally recognized conferences.

Gain advanced research and industry experience through research assistantships, collaborations, or internships in strong AI research environments.

Long-Term:

Become an internationally recognized AI researcher and engineer with expertise in both scientific research and deployable AI systems.

Build a product-based AI company offering premium AI-powered solutions for education, healthcare, research, and emerging markets.

Achieve financial independence through a combination of AI research, software products, entrepreneurship, and industry experience.

Personal Traits & Vision:
Dual-Track Mindset: Pursuing both academically rigorous AI research and real-world production engineering.

Research-to-Product Approach: Interested in transforming research concepts into usable, scalable, and maintainable AI applications.

Adaptability: Expanding from medical image analysis into trustworthy AI, explainable AI, LLMs, Retrieval-Augmented Generation, AI infrastructure, and educational technology.

Entrepreneurial Drive: Building technical, research, product-development, and open-source experience as preparation for creating an AI-focused technology company.

Vision: To become a globally recognized AI researcher, engineer, and entrepreneur who develops trustworthy AI systems that bridge academia, industry, healthcare, education, and society.`;

const SECTIONS = [
  {
    id: 'education',
    title: 'Education',
    aliases: ['education', 'university', 'degree', 'academic', 'bsc', 'graduate', 'study'],
    content: `Education: Recent Computer Science and Engineering graduate from United International University.`
  },
  {
    id: 'research_focus',
    title: 'Research Focus',
    aliases: ['research focus', 'deep learning', 'machine learning', 'medical image analysis', 'explainable ai', 'trustworthy ai', 'computer vision', 'multimodal learning', 'large language models', 'rag', 'retrieval-augmented generation', 'time-series analysis'],
    content: `Research Focus: Deep learning, machine learning, medical image analysis, explainable AI, trustworthy AI, computer vision, multimodal learning, large language models, Retrieval-Augmented Generation, and time-series analysis.`
  },
  {
    id: 'publications',
    title: 'Publications',
    aliases: ['publications', 'papers', 'published', 'conference papers', 'book chapter'],
    content: `Publications: Four conference papers published, along with a research-related book chapter. Two Q1 journal manuscripts are submitted and under review (ACAT-UE and GDDI), one Q1 journal manuscript (BS-Net) is in preparation, and CausalMask-XAI is an ongoing research project.`
  },
  {
    id: 'bs_net',
    title: 'Q1 Manuscript in Preparation - Thoracic Disease Screening (BS-Net)',
    aliases: ['ongoing q1', 'ongoing journal', 'in preparation', 'running q1', 'q1 in preparation', 'thoracic disease', 'bs-net', 'bs net', 'densenet', 'spatial attention', 'chest radiograph', 'chest x-ray', 'federated', 'multi-label', 'curriculum-guided'],
    content: `Q1 Manuscript in Preparation: Curriculum-Guided Spatial Attention Resolves Multi-Annotator Label Ambiguity in Thoracic Disease Screening. Proposed BS-Net, a clinically grounded multi-label chest radiograph classification architecture based on DenseNet-121 and a custom Bottleneck Spatial Attention Module. The model uses supervised spatial attention with clinically validated bounding-box priors to reduce shortcut learning and improve interpretability. BS-Net combines binary cross-entropy classification loss with soft Dice attention-supervision loss through a dual-objective optimization strategy. On a diverse test set of 3,000 chest X-ray images, the model achieved a Macro-Average AUC of 0.9607, Mean Average Precision of 0.6506, Pointing Game Accuracy of 84.87%, and Mean IoU of 0.4941. The study demonstrated that unconstrained attention slightly reduced baseline performance, while clinically supervised attention improved classification and localization, including approximately 1.5% AUC improvements for Fibrosis and Calcification. Robustness testing with synthetic out-of-distribution artifacts produced a low false-positive rate of 0.0156, demonstrating resistance to shortcut features such as text markers and hospital tokens.`
  },
  {
    id: 'submitted_q1',
    title: 'Submitted Q1 Journals (Under Review)',
    aliases: ['submitted q1', 'submitted journal', 'submitted journals', 'submitted manuscripts', 'under review', 'journal manuscripts', 'q1 journals'],
    content: `Submitted Q1 Journals (under review): Two Q1 manuscripts are under review. (1) ACAT-UE: Uncertainty-Aware Cross-Modal Co-Attention Fusion for Reliable Multimodal Lung Cancer Classification Using CT and Histopathology, under review at Expert Systems with Applications (Elsevier), with accuracy of 92.78% and macro-AUC of 0.9682. (2) Gradient-Decoupled Dual-Stream Learning for Edge-Efficient Melanoma Classification (GDDI), under review at Journal of Visual Communication and Image Representation (Elsevier), a lightweight MobileNetV3 framework with mean AUC-ROC of 0.8975 on ISIC 2020. A third Q1 manuscript, BS-Net, is in preparation.`
  },
  {
    id: 'acat_ue',
    title: 'Submitted Q1 Journal - Multimodal Lung Cancer Classification (ACAT-UE)',
    aliases: ['acat-ue', 'acat ue', 'lung cancer', 'multimodal', 'ct histopathology', 'histopathology', 'co-attention', 'uncertainty', 'monte carlo dropout', 'expert systems with applications', 'eswa', 'calibration'],
    content: `Submitted Q1 Journal (under review at Expert Systems with Applications, Elsevier): ACAT-UE: Uncertainty-Aware Cross-Modal Co-Attention Fusion for Reliable Multimodal Lung Cancer Classification Using CT and Histopathology. The framework uses modality-specific encoders, iterative bidirectional co-attention between CT and histopathology, adaptive modality weighting, and Monte Carlo Dropout uncertainty (entropy and epistemic) on three classes: benign, adenocarcinoma, and squamous cell carcinoma. It achieved accuracy of 92.78%, macro-F1 of 0.9145, macro-AUC of 0.9682, expected calibration error of 0.0791, and Brier score of 0.0698, with higher uncertainty on incorrect predictions.`
  },
  {
    id: 'causalmask_xai',
    title: 'Ongoing Research Project - CausalMask-XAI',
    aliases: ['causalmask', 'causalmask-xai', 'causal mask', 'research project', 'side project', 'breast ultrasound', 'explanation faithfulness', 'faithfulness', 'xai', 'bus-uclm', 'busi', 'grad-cam'],
    content: `Ongoing Research Project (not yet a manuscript): CausalMask-XAI, an intervention-based framework for evaluating explanation faithfulness and localization in breast ultrasound classification. It compares an EfficientNet-B0 baseline with a causal-intervention model, trained on BUSI with grouped cross-validation and tested externally on BUS-UCLM, and scores Grad-CAM, Grad-CAM++, Integrated Gradients, and RISE explanations. The aim is to show that similar discrimination can hide very different threshold behavior and explanation quality. Results are not final.`
  },
  {
    id: 'aster',
    title: 'ASTER - AI Healthcare Triage Bot',
    aliases: ['aster', 'triage', 'triage bot', 'healthcare triage', 'symptom extraction', 'urgency assessment', 'case routing', 'production system', 'production systems', 'production'],
    content: `Production System 2: ASTER, an AI healthcare triage bot, in production with real users at EATL. ASTER performs conversational symptom extraction, urgency assessment, preliminary healthcare guidance, and structured case routing. Stack: LLMs, generative AI, prompt engineering, conversational voice AI, FastAPI, and REST APIs.`
  },
  {
    id: 'gddi',
    title: 'Submitted Q1 Journal - Melanoma Detection (GDDI)',
    aliases: ['melanoma', 'gdmi', 'gddi', 'jvcir', 'gradient-decoupled', 'mobilenetv3', 'edge devices', 'isic 2020', 'dual-stream'],
    content: `Submitted Q1 Journal (under review at Journal of Visual Communication and Image Representation, Elsevier): Gradient-Decoupled Dual-Stream Learning for Edge-Efficient Melanoma Classification (GDDI). Developed a lightweight dual-stream MobileNetV3 framework with approximately 2 million parameters for melanoma detection. The model processes global lesion shape at 224×224 resolution and local texture information at 128×128 resolution. Introduced Gradient-Decoupled Modality Isolation, a training strategy that trains the global and local streams independently before combining their predictions through inference-time ensemble fusion. This approach reduces modality collapse without introducing additional architectural complexity. Evaluated using patient-level five-fold cross-validation on the highly imbalanced ISIC 2020 dataset, the framework achieved a mean AUC-ROC of 0.8975 ± 0.0150 compared with 0.8872 for the joint-training baseline. It also achieved a Partial AUC of 0.9850 in the high-sensitivity screening region, accuracy of 90.2%, and specificity of 90.6%, while reducing false-positive predictions.`
  },
  {
    id: 'other_research',
    title: 'Other Research Work',
    aliases: ['capstone', 'lung disease', 'fault reduction', 'electrical fault', 'brain tumour', 'brain tumor', 'channel attention', 'elderly movement', 'environmental sensor', 'medical image explainability', 'retinal vessel segmentation', 'ride-sharing'],
    content: `Other Research Work: Capstone Project on Advanced Deep Learning Techniques for Classifying and Assessing the Severity of Lung Diseases using Chest X-ray Images. Adaptive Fault Reduction Algorithm research using machine learning for electrical fault detection, achieving approximately 99.79% classification accuracy. Additional research experience includes brain tumour classification using channel attention, elderly movement-intensity prediction using environmental sensor data, medical image explainability, retinal vessel segmentation, and ride-sharing trend analysis.`
  },
  {
    id: 'current_role',
    title: 'Current Role',
    aliases: ['current role', 'ai engineer', 'ethics advance technology', 'eatl', 'current position', 'job', 'work'],
    content: `Current Role: AI Engineer at Ethics Advance Technology Limited, Dhaka, Bangladesh. Responsibilities: Designing, developing, and integrating AI-powered systems for real-world educational, institutional, and healthcare applications. Two systems are in production with real users (the AI-powered Medical Education Platform and ASTER), and he built most of the AI features in both. Responsibilities include LLM and RAG development, computer vision, AI system architecture, FastAPI backend integration, database design, asynchronous job processing, GPU workload management, and production deployment.`
  },
  {
    id: 'career_direction',
    title: 'Career Direction',
    aliases: ['career direction', 'career goals', 'trustworthy ai', 'medical imaging', 'educational ai', 'llm systems', 'production ml'],
    content: `Career Direction: Combining applied AI engineering with academic research to build expertise in trustworthy AI, medical imaging, educational AI, LLM systems, and production-ready machine learning applications.`
  },
  {
    id: 'ai_lms',
    title: 'AI-Powered Medical Education Platform (AI-LMS)',
    aliases: ['ai-lms', 'ai lms', 'medical education platform', 'medical lms', 'patient simulation', 'proctoring', 'radiology learning', 'textbook qa', 'learning management', 'medical education', 'ai question generation', 'ai viva', 'ai presentation', 'ai evaluation', 'personalized learning', 'hybrid retrieval', 'online examination', 'ai usage management'],
    content: `Production System 1: AI-Powered Medical Education Platform (AI-LMS), in production with real users at EATL. The AI-LMS is a comprehensive institutional educational platform designed primarily for medical education. It combines learning management, RAG-based medical question answering over textbooks, AI-generated educational content, automated assessment, online examination, real-time AI viva, AI clinical patient practice simulation, AI-based live exam proctoring using computer vision, radiology learning, presentation generation, personalized learning, and academic analytics. Core AI-LMS Features: AI Question Generation (MCQ, descriptive, adaptive, short-answer, structured essay, clinical scenario-based questions), AI Viva System (interactive text and voice-based viva examinations, follow-up questions, answer evaluation, performance summaries), AI Presentation Generation (structured educational presentations from academic documents using background processing and dedicated GPU job queues), AI Evaluation (configurable rubrics, scores, feedback, strengths, weaknesses, improvement recommendations), Personalized Learning Paths (chapters, topics, learning materials, practice questions, difficulty levels based on student performance), Hybrid Retrieval System (BM25 keyword search, dense semantic retrieval, PostgreSQL, PGVector, metadata filtering, semantic chunking, context ranking), Online Examination (large student cohorts, structured examinations, question management, student submissions, performance tracking, administrative controls), AI Usage Management (token consumption, model usage, processing costs, available institutional AI balances), Production Architecture (FastAPI, Next.js, PostgreSQL, SQLAlchemy, Redis, WebSockets, background workers, distributed locks, dedicated GPU queues, asynchronous processing).`
  },
  {
    id: 'opencode_skills',
    title: 'OpenCode Engineering Skills',
    aliases: ['opencode engineering skills', 'opencode package', 'opencode skills', 'opencode', 'engineering skills', 'open source engineering'],
    content: `OpenCode Engineering Skills: Created and maintain an open-source engineering skill package for AI coding agents. The package provides reusable, role-specific engineering instructions for Python development, FastAPI, Next.js, UI/UX design, SQLAlchemy, PostgreSQL, testing, debugging, security review, code review, production readiness, AI system architecture, and general system architecture. The project includes skill validation, installation utilities, cross-platform setup, prompt optimization, context reduction, and token-saving workflows. Its objective is to make AI-assisted software engineering more consistent, architecture-aware, secure, and efficient.`
  },
  {
    id: 'cheating_risk',
    title: 'Cheating Risk Analysis',
    aliases: ['cheating risk analysis', 'cheating risk', 'cheating detection', 'exam monitoring', 'proctoring', 'yolov8', 'mediapipe', 'behavioral assessment'],
    content: `Cheating Risk Analysis: Developed a Python-based cheating-risk analysis service using computer vision and AI-powered behavioral assessment. The system supports real-time webcam and video analysis using MediaPipe and YOLOv8, suspicious-behavior detection, AI-powered risk assessment, cheating-probability scoring, activity timelines, and automated summaries. The production architecture includes FastAPI, asynchronous SQLAlchemy, PostgreSQL, Redis, Celery background workers, Prometheus monitoring, AWS S3 integration, OpenAI-based analysis, caching, and scalable worker processing.`
  },
  {
    id: 'ai_research_academy',
    title: 'AI Research Academy',
    aliases: ['ai research academy', 'research academy', 'educational platform', 'next.js education', 'computer vision learning', 'deep learning tracks'],
    content: `AI Research Academy: Developed an educational platform for artificial intelligence and machine learning research using Next.js. The platform provides structured learning tracks in computer vision and deep learning, interactive educational content, research-focused documentation, and organized learning resources for students and aspiring AI researchers.`
  },
  {
    id: 'face_detector',
    title: 'Face Detector — Real-Time Three-Person Desktop Alert',
    aliases: ['face detector', 'face recognition', 'real-time monitoring', 'desktop alert', 'webcam monitoring', 'privacy-conscious'],
    content: `Face Detector — Real-Time Three-Person Desktop Alert: Developed a local face-recognition and monitoring system for a fixed webcam. The system enrolls three specific individuals, detects and recognizes them in real time, and sends desktop popup notifications when one of the enrolled people appears. It is designed for lightweight, local, and privacy-conscious execution.`
  },
  {
    id: 'resume_optimizer',
    title: 'Resume-Optimizer-AI',
    aliases: ['resume optimizer', 'resume-optimizer', 'ats optimization', 'job description', 'resume analysis', 'applicant tracking'],
    content: `Resume-Optimizer-AI: Developed an AI-powered resume optimization application. Users can upload a resume and provide a target job description. The system analyzes the resume against the job requirements and generates suggestions for improving relevance, structure, wording, skills alignment, and applicant-tracking-system compatibility.`
  },
  {
    id: 'technical_skills',
    title: 'Technical Skills',
    aliases: ['technical skills', 'tech stack', 'skills', 'technologies', 'tools', 'pytorch', 'fastapi', 'nextjs', 'postgresql', 'sqlalchemy', 'pgvector', 'redis', 'celery', 'computer vision', 'llm', 'rag', 'medical image analysis', 'multimodal learning', 'ai infrastructure', 'production debugging'],
    content: `Strong hands-on expertise in PyTorch, FastAPI, Next.js, PostgreSQL, SQLAlchemy, PGVector, Redis, Celery, computer vision, LLM applications, RAG systems, medical image analysis, multimodal learning, AI infrastructure, and production debugging.`
  },
  {
    id: 'future_goals',
    title: 'Future Goals',
    aliases: ['future goals', 'short-term', 'mid-term', 'long-term', 'masters', 'mphil', 'phd', 'pte', 'australia', 'europe', 'asia', 'research assistantship', 'internship', 'entrepreneurship', 'ai company'],
    content: `Future Goals: Short-Term: Strengthen academic and professional research profiles through Q1 journal publications, production-grade AI systems, open-source contributions, and international research collaboration. Prepare for PTE and apply for research-based master's or MPhil opportunities, primarily in Australia, while considering suitable alternatives in Europe and Asia. Continue developing expertise in medical image analysis, trustworthy AI, explainable AI, LLMs, RAG, and production-oriented AI engineering. Mid-Term: Pursue impactful research during a research-based master's or MPhil program. Publish additional Q1 journal papers and present research at internationally recognized conferences. Gain advanced research and industry experience through research assistantships, collaborations, or internships in strong AI research environments. Long-Term: Become an internationally recognized AI researcher and engineer with expertise in both scientific research and deployable AI systems. Build a product-based AI company offering premium AI-powered solutions for education, healthcare, research, and emerging markets. Achieve financial independence through a combination of AI research, software products, entrepreneurship, and industry experience.`
  },
  {
    id: 'personal_traits',
    title: 'Personal Traits & Vision',
    aliases: ['personal traits', 'dual-track', 'research-to-product', 'adaptability', 'entrepreneurial drive', 'vision', 'mindset'],
    content: `Personal Traits & Vision: Dual-Track Mindset: Pursuing both academically rigorous AI research and real-world production engineering. Research-to-Product Approach: Interested in transforming research concepts into usable, scalable, and maintainable AI applications. Adaptability: Expanding from medical image analysis into trustworthy AI, explainable AI, LLMs, Retrieval-Augmented Generation, AI infrastructure, and educational technology. Entrepreneurial Drive: Building technical, research, product-development, and open-source experience as preparation for creating an AI-focused technology company. Vision: To become a globally recognized AI researcher, engineer, and entrepreneur who develops trustworthy AI systems that bridge academia, industry, healthcare, education, and society.`
  }
];

const STATIC_RESPONSES = {
  greeting: `Hello! I'm **ByteBuddy**, Md Sayem Ahamed's personal AI assistant. Ask me anything about his skills, projects, experience, or research — I'm here to help!`,
  who_are_you: `I'm **ByteBuddy**, **Md Sayem Ahamed**'s personal AI assistant. I represent him on this portfolio website and can answer questions about his career, skills, projects, and research.`,
  contact: `You can reach Md Sayem Ahamed at **sayem1.ahamed@gmail.com** or connect on [LinkedIn](https://www.linkedin.com/in/md-sayem-ahamed-3bab77337/). If you'd like, I can record your email so he can follow up — just let me know!`,
  github: `You can find Md Sayem Ahamed's GitHub profile at [github.com/sayem-ahamed](https://github.com/sayem-ahamed) (or search "sayem-ahamed" on GitHub).`,
  researchgate: `Md Sayem Ahamed's ResearchGate profile contains his published papers: [ResearchGate](https://www.researchgate.net/profile/Md-Sayem-Ahamed).`,
  linkedin: `Connect with Md Sayem Ahamed on LinkedIn: [linkedin.com/in/md-sayem-ahamed-3bab77337](https://www.linkedin.com/in/md-sayem-ahamed-3bab77337/).`,
  unrelated: `I can help with questions about Sayem's experience, research, projects, publications, technical skills and collaboration interests.`
};

const DISCLAIMER = `\n\n_The live AI models are temporarily unavailable, so this answer was retrieved directly from Sayem's verified portfolio profile._`;

function normalizeText(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const STOPWORDS = new Set(['what', 'the', 'is', 'are', 'how', 'when', 'where', 'why', 'who', 'which', 'can', 'you', 'me', 'tell', 'about', 'for', 'and', 'or', 'with', 'this', 'that', 'from', 'into', 'your', 'my', 'his', 'her', 'their', 'our', 'a', 'an', 'of', 'to', 'in', 'on', 'at', 'by', 'be', 'do', 'does', 'did', 'have', 'has', 'had', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'i', 'we', 'they', 'he', 'she', 'it', 'us', 'them', 'question', 'questions', 'answer', 'answers']);

function tokenize(text) {
  return normalizeText(text).split(/\s+/).filter(t => t.length > 2 && !STOPWORDS.has(t));
}

function scoreSection(section, queryTokens) {
  let score = 0;
  const aliasTokens = new Set();
  section.aliases.forEach(alias => {
    aliasTokens.add(...tokenize(alias));
  });
  const contentTokens = new Set(tokenize(section.content));

  for (const qt of queryTokens) {
    if (aliasTokens.has(qt)) {
      score += 10;
    }
    if (contentTokens.has(qt)) {
      score += 3;
    }
    for (const at of aliasTokens) {
      if (at.includes(qt) || qt.includes(at)) {
        score += 2;
      }
    }
    for (const ct of contentTokens) {
      if (ct.includes(qt) || qt.includes(ct)) {
        score += 1;
      }
    }
  }
  return score;
}

function getStaticResponse(message) {
  const m = message.toLowerCase().trim();
  if (/\b(hi|hello|hey|greetings|howdy)\b/.test(m)) return STATIC_RESPONSES.greeting;
  if (/\b(who are you|what is your name|who is bytebuddy)\b/.test(m)) return STATIC_RESPONSES.who_are_you;
  if (/\b(contact|email|reach|get in touch)\b/.test(m)) return STATIC_RESPONSES.contact;
  if (/\b(github|github profile)\b/.test(m)) return STATIC_RESPONSES.github;
  if (/\b(researchgate|research gate)\b/.test(m)) return STATIC_RESPONSES.researchgate;
  if (/\b(linkedin|linked in)\b/.test(m)) return STATIC_RESPONSES.linkedin;
  if (/\b(who is sayem|who is md sayem|tell me about sayem|about sayem)\b/.test(m)) {
    return `**Md Sayem Ahamed** is an AI Engineer at Ethics Advance Technology Limited and an Applied AI Researcher. He graduated with a BSc in Computer Science and Engineering from United International University (February 2025). His work spans deep learning, LLMs, RAG, medical image analysis, and production AI systems. He has published four conference papers and a book chapter, with two Q1 journal manuscripts under review (ACAT-UE and GDDI), a third (BS-Net) in preparation, and an ongoing research project (CausalMask-XAI). At EATL he built most of the AI features in two production systems, the AI-Powered Medical Education Platform and ASTER (an AI healthcare triage bot). Key projects include the Medical Education Platform, ASTER, OpenCode Engineering Skills, Cheating Risk Analysis, AI Research Academy, Face Detector, and Resume-Optimizer-AI.`;
  }
  return null;
}

function keywordAnswer(message) {
  const staticResp = getStaticResponse(message);
  if (staticResp) return { content: staticResp + DISCLAIMER, isUnrelated: false };

  const queryTokens = tokenize(message);
  if (queryTokens.length === 0) return { content: STATIC_RESPONSES.unrelated + DISCLAIMER, isUnrelated: true };

  const scored = SECTIONS.map(s => ({
    section: s,
    score: scoreSection(s, queryTokens)
  })).filter(s => s.score > 0).sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return { content: STATIC_RESPONSES.unrelated + DISCLAIMER, isUnrelated: true };
  }

  const topSections = scored.slice(0, 2).map(s => s.section.content);
  return { content: topSections.join('\n\n') + DISCLAIMER, isUnrelated: false };
}

function structuredFallback(profile, message, history) {
  const result = keywordAnswer(message);
  if (result && !result.isUnrelated) {
    return result.content;
  }

  const lastAssistant = [...(history || [])].reverse().find(h => h.role === 'assistant');
  if (lastAssistant && lastAssistant.content) {
    return `I'm sorry, I couldn't find a specific answer to that in my available knowledge base. Could you please try rephrasing? I can answer questions about my skills, projects, experience, education, research, or contact information.` + DISCLAIMER;
  }

  return STATIC_RESPONSES.unrelated + DISCLAIMER;
}

module.exports = { keywordAnswer, structuredFallback };
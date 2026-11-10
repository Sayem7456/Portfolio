const test = require('node:test');
const assert = require('node:assert');
const { keywordAnswer, structuredFallback } = require('./local-fallback');

test('local-fallback static responses', async (t) => {
  await t.test('greeting returns ByteBuddy greeting', () => {
    const result = keywordAnswer('hi');
    assert.ok(result.content.includes('ByteBuddy'));
    assert.ok(result.content.includes('Md Sayem Ahamed'));
    assert.ok(result.content.includes('_The live AI models are temporarily unavailable'));
  });

  await t.test('who are you returns identity', () => {
    const result = keywordAnswer('who are you');
    assert.ok(result.content.includes('ByteBuddy'));
    assert.ok(result.content.includes('Md Sayem Ahamed'));
  });

  await t.test('contact returns email and LinkedIn', () => {
    const result = keywordAnswer('contact email');
    assert.ok(result.content.includes('sayem1.ahamed@gmail.com'));
    assert.ok(result.content.includes('LinkedIn'));
  });

  await t.test('github returns GitHub link', () => {
    const result = keywordAnswer('github');
    assert.ok(result.content.includes('github.com'));
  });

  await t.test('researchgate returns ResearchGate link', () => {
    const result = keywordAnswer('researchgate');
    assert.ok(result.content.includes('ResearchGate'));
  });

  await t.test('who is sayem returns bio', () => {
    const result = keywordAnswer('who is sayem');
    assert.ok(result.content.includes('AI Engineer'));
    assert.ok(result.content.includes('United International University'));
    assert.ok(result.content.includes('Q1 journal'));
  });
});

test('local-fallback section scoring', async (t) => {
  await t.test('education query returns education section', () => {
    const result = keywordAnswer('education');
    assert.ok(result.content.includes('United International University'));
    assert.ok(result.content.includes('Computer Science'));
  });

  await t.test('current role query returns role section', () => {
    const result = keywordAnswer('current role');
    assert.ok(result.content.includes('AI Engineer'));
    assert.ok(result.content.includes('Ethics Advance Technology'));
  });

  await t.test('ai-lms query returns AI-LMS section', () => {
    const result = keywordAnswer('ai-lms');
    assert.ok(result.content.includes('AI-Powered Medical Education Platform'));
    assert.ok(result.content.includes('medical education'));
  });

  await t.test('medical lms alias works', () => {
    const result = keywordAnswer('medical lms');
    assert.ok(result.content.includes('AI-Powered Medical Education Platform'));
  });

  await t.test('opencode engineering skills query returns section', () => {
    const result = keywordAnswer('opencode engineering skills');
    assert.ok(result.content.includes('open-source engineering skill package'));
  });

  await t.test('opencode package alias works', () => {
    const result = keywordAnswer('opencode package');
    assert.ok(result.content.includes('open-source engineering skill package'));
  });

  await t.test('publications query returns publications', () => {
    const result = keywordAnswer('publications');
    assert.ok(result.content.includes('conference papers'));
    assert.ok(result.content.includes('Q1 journal'));
  });

  await t.test('ongoing q1 query returns thoracic/bs-net', () => {
    const result = keywordAnswer('ongoing q1');
    assert.ok(result.content.includes('Thoracic Disease') || result.content.includes('BS-Net'));
  });

  await t.test('submitted q1 query returns melanoma/gdmi', () => {
    const result = keywordAnswer('submitted q1');
    assert.ok(result.content.includes('Melanoma') || result.content.includes('Gradient-Decoupled'));
  });

  await t.test('thoracic disease alias works', () => {
    const result = keywordAnswer('thoracic disease');
    assert.ok(result.content.includes('Thoracic Disease') || result.content.includes('BS-Net'));
  });

  await t.test('bs-net alias works', () => {
    const result = keywordAnswer('bs-net');
    assert.ok(result.content.includes('BS-Net') || result.content.includes('DenseNet'));
  });

  await t.test('melanoma alias works', () => {
    const result = keywordAnswer('melanoma');
    assert.ok(result.content.includes('Melanoma') || result.content.includes('MobileNetV3'));
  });

  await t.test('gdmi alias works', () => {
    const result = keywordAnswer('gdmi');
    assert.ok(result.content.includes('Gradient-Decoupled') || result.content.includes('Melanoma'));
  });

  await t.test('cheating risk analysis query returns section', () => {
    const result = keywordAnswer('cheating risk analysis');
    assert.ok(result.content.includes('cheating-risk analysis') || result.content.includes('YOLOv8'));
  });

  await t.test('ai research academy query returns section', () => {
    const result = keywordAnswer('ai research academy');
    assert.ok(result.content.includes('AI Research Academy') || result.content.includes('Next.js'));
  });

  await t.test('face detector query returns section', () => {
    const result = keywordAnswer('face detector');
    assert.ok(result.content.includes('Face Detector') || result.content.includes('face-recognition'));
  });

  await t.test('resume optimizer query returns section', () => {
    const result = keywordAnswer('resume optimizer');
    assert.ok(result.content.includes('Resume-Optimizer-AI') || result.content.includes('ATS'));
  });

  await t.test('technical skills query returns skills', () => {
    const result = keywordAnswer('technical skills');
    assert.ok(result.content.includes('PyTorch') || result.content.includes('FastAPI') || result.content.includes('PostgreSQL'));
  });

  await t.test('contact query returns contact info', () => {
    const result = keywordAnswer('contact');
    assert.ok(result.content.includes('sayem1.ahamed@gmail.com'));
  });

  await t.test('github query returns github', () => {
    const result = keywordAnswer('github');
    assert.ok(result.content.includes('github.com'));
  });

  await t.test('linkedin query returns linkedin', () => {
    const result = keywordAnswer('linkedin');
    assert.ok(result.content.includes('LinkedIn'));
  });

  await t.test('research collaboration returns relevant sections', () => {
    const result = keywordAnswer('research collaboration');
    assert.ok(result.content.includes('international research collaboration') || result.content.includes('research assistantships') || result.content.includes('collaborations'));
  });
});

test('local-fallback unrelated queries', () => {
  const result = keywordAnswer('what is the weather today');
  assert.ok(result.content.includes('experience, research, projects, publications, technical skills and collaboration interests'));
  assert.ok(result.content.includes('_The live AI models are temporarily unavailable'));
});

test('structuredFallback passes disclaimer', () => {
  const result = structuredFallback({}, 'hi', []);
  assert.ok(result.includes('_The live AI models are temporarily unavailable'));
});

test('structuredFallback with history', () => {
  const history = [{ role: 'assistant', content: 'Previous answer' }];
  const result = structuredFallback({}, 'unrelated question', history);
  assert.ok(result.includes('couldn\'t find a specific answer'));
  assert.ok(result.includes('_The live AI models are temporarily unavailable'));
});
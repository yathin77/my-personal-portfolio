/**
 * @file server.ts
 * @description Full-stack Express server for Yathin's Vibe Coding Portfolio.
 * Handles server-side Gemini 4 Argon (`gemini-4-argon`) API requests with `ThinkingLevel.HIGH`
 * for the interactive Vibe Prompt Architect in the Toolkit page, and serves the Vite app on port 3000.
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import { synthesizeVibeBlueprintFallback } from './src/utils/portfolioLogic.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  /**
   * POST /api/vibe-think
   * Uses `gemini-4-argon` with `ThinkingLevel.HIGH` (and no maxOutputTokens)
   * to transform a visitor's raw web app idea into a structured Vibe Coding Research & Build Blueprint,
   * modeled after Yathin's real workflow across Claude, ChatGPT, Gemini, and Google AI Studio.
   */
  app.post('/api/vibe-think', async (req, res) => {
    const { rawIdea, focusArea } = req.body ?? {};

    if (!rawIdea || typeof rawIdea !== 'string' || rawIdea.trim().length < 4) {
      res.status(400).json({
        error: 'Please enter a project idea (at least 4 characters) to architect.',
      });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      // Return deterministic blueprint when API key is not configured
      const fallback = synthesizeVibeBlueprintFallback(
        rawIdea,
        focusArea || 'Full-Stack Web Prototype'
      );
      res.json({
        blueprint: fallback,
        source: 'architectural-template',
      });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `You are Yathin Ajay Kumar's Vibe Coding Prompt Architect.
A user wants to build the following web project idea: "${rawIdea.trim()}"
Target Focus Area: "${(focusArea || 'Full-Stack Google AI Studio Web App').trim()}"

Following Yathin's vibe coding methodology (using Claude, ChatGPT, and Gemini for clear research and prompt/content synthesis, and building/hosting in Google AI Studio with clean semantic HTML, commented JavaScript, and JSON data files), generate a concise, actionable Vibe Coding Blueprint.`;

      const response = await ai.models.generateContent({
        model: 'gemini-4-argon',
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
          systemInstruction:
            'You are an expert web architect and vibe coding mentor. Return a structured JSON blueprint with concise, high-impact fields.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              projectTitle: {
                type: Type.STRING,
                description: 'Editorial project title for the idea.',
              },
              researchAngle: {
                type: Type.STRING,
                description:
                  'How to research and structure content using ChatGPT, Gemini, and Claude before coding.',
              },
              recommendedTools: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description:
                  'Specific roles for Claude, ChatGPT, Gemini, and Google AI Studio.',
              },
              dataFilesNeeded: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description:
                  'JSON or Markdown data files to keep content decoupled from page code.',
              },
              masterBuildPrompt: {
                type: Type.STRING,
                description:
                  'A crystal-clear build prompt ready to paste into Google AI Studio.',
              },
              learningFocus: {
                type: Type.STRING,
                description:
                  'One core HTML/JavaScript concept the developer will learn from inspecting this build.',
              },
              reasoningMode: {
                type: Type.STRING,
                description:
                  'Summary of the high-thinking architectural decision.',
              },
            },
            required: [
              'projectTitle',
              'researchAngle',
              'recommendedTools',
              'dataFilesNeeded',
              'masterBuildPrompt',
              'learningFocus',
              'reasoningMode',
            ],
          },
        },
      });

      const rawText = (response.text ?? '').trim();
      const parsed = JSON.parse(rawText);
      res.json({
        blueprint: parsed,
        source: 'gemini-4-argon-high-thinking',
      });
    } catch (error: unknown) {
      // Graceful fallback if free-tier key hits quota or paid model restriction
      const fallback = synthesizeVibeBlueprintFallback(
        rawIdea,
        focusArea || 'Full-Stack Web Prototype'
      );
      res.json({
        blueprint: fallback,
        source: 'architectural-template',
        note:
          error instanceof Error
            ? error.message
            : 'Synthesized using Yathin’s built-in Vibe Architecture Engine.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

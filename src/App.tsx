import React, { useState } from 'react';
import { Wand2, Image as ImageIcon, Moon, Sun, Loader2, Sparkles, Download } from 'lucide-react';
import Together from 'together-ai';

const together = new Together({ apiKey: import.meta.env.VITE_TOGETHER_API_KEY });

const MODEL = "black-forest-labs/FLUX.1-schnell-Free";

const RANDOM_PROMPTS = [
  "A futuristic cyberpunk cityscape at night, filled with neon lights, holographic advertisements, and flying cars. The city is a mix of towering skyscrapers and old, worn-out buildings, with a lone cybernetic samurai standing on a rooftop, overlooking the city with a glowing katana.",
  "A mystical underwater kingdom illuminated by glowing corals and bioluminescent creatures. A mermaid with shimmering silver scales and translucent wings hovers above an ancient sunken temple, surrounded by schools of jellyfish emitting soft blue light.",
  "A giant ancient tree with golden leaves, standing alone in a vast desert under a crimson sunset. The tree’s roots extend deep into the sand, revealing glowing veins of energy. A group of hooded monks in dark robes performs a ritual beneath its branches.",
  "A mechanical dragon soaring over a futuristic battlefield, its body composed of intricate gears and glowing blue circuits. Soldiers in high-tech exosuits battle against robotic war machines in the ruins of a collapsed city.",
  "A Viking warrior standing on a frozen lake, wielding a glowing frost axe. Behind him, a massive ice dragon with translucent wings emerges from a swirling blizzard, its breath freezing everything in its path.",
  "A post-apocalyptic wasteland where nature has reclaimed the ruins of an old city. Vines creep over broken skyscrapers, and strange mutated creatures roam the streets. A lone survivor in ragged armor and a gas mask walks cautiously with a makeshift spear.",
  "An enchanted steampunk airship soaring through the clouds, powered by massive brass engines and intricate clockwork gears. The crew, wearing Victorian-era outfits with mechanical enhancements, navigates toward a floating island with waterfalls cascading into the sky.",
  "An abandoned cathedral overtaken by nature, where the stained-glass windows still glow with divine light. A mysterious robed figure kneels before an ancient altar, surrounded by ghostly apparitions whispering forgotten prayers.",
  "A surreal dreamscape where the sky is a swirling mix of galaxies and nebulae. Floating islands connected by glowing bridges, each containing a unique biome—one covered in lava, another frozen in eternal winter, and another a lush jungle of alien plants.",
  "A grand medieval castle suspended in mid-air, surrounded by a swirling vortex of stars. A knight in gleaming celestial armor stands at the entrance, his sword pulsating with divine energy, as an army of shadowy creatures ascends from below.",
  "A futuristic samurai warrior in an urban neon-lit alley, wearing a sleek exosuit with holographic tattoos. His cybernetic arms crackle with electricity as he prepares for a duel against an enemy wielding an energy katana.",
  "An ancient library hidden deep within a vast jungle, its shelves filled with glowing tomes containing lost knowledge. A young explorer in a leather jacket and goggles opens a book, releasing a swirl of magical runes into the air.",
  "A celestial being composed of swirling galaxies and radiant stardust, standing in the middle of a cosmic void. Their eyes shine like twin supernovas as they reach out to touch a newborn planet forming in their palm.",
  "A biomechanical phoenix rising from a pool of molten gold, its wings shimmering with intricate metallic feathers. Sparks fly as it ascends, leaving trails of liquid fire in the air.",
  "A sci-fi desert planet with massive sand dunes stretching endlessly. A towering ancient robot, half-buried in the sand, slowly awakens as explorers in futuristic armor approach with cautious steps.",
  "A mystical Asian-inspired city built on floating islands, connected by ancient rope bridges and waterfalls that flow into the clouds. A wandering swordsman with a red scarf stands at the edge, gazing at a glowing temple in the distance.",
  "A futuristic deep-sea research station built inside a massive jellyfish, glowing softly in the dark ocean depths. Scientists in high-tech diving suits monitor alien sea creatures swimming in the bioluminescent abyss.",
  "A gothic vampire lord sitting on a dark crimson throne inside a massive candle-lit cathedral. Bats swarm around the towering stained-glass windows as a full moon casts an eerie glow through the mist.",
  "A massive, ancient spaceship abandoned in deep space, its once-glorious interior now overgrown with strange alien flora. A group of astronauts cautiously explores the decayed corridors, their flashlights illuminating mysterious symbols on the walls.",
  "A majestic griffin with fiery wings soaring over a vast canyon filled with floating islands. A warrior in golden armor rides on its back, gripping an enchanted spear that crackles with lightning.",
  "An interdimensional marketplace where alien merchants trade rare cosmic artifacts. The sky is a swirling mix of nebulas and floating asteroids, while creatures of all shapes and sizes negotiate using glowing crystal currencies. A time-traveling rogue in a tattered cloak inspects a mysterious cube that bends light around it.",
  "A colossal ancient titan made of living stone, partially buried beneath a frozen tundra, with massive trees growing from its back. As the ice begins to crack, revealing glowing runes across its surface, a group of cloaked scholars on mechanical wolf mounts decipher its secrets while a storm brews above them.",
  "A dystopian cybernetic orchestra where musicians are half-human, half-machine, their bodies embedded with glowing wires and data streams. The conductor, an AI housed in a levitating metallic sphere, guides the symphony with mechanical arms, creating music so powerful that it materializes as neon holographic waves in the air.",
  "A celestial forge floating in deep space, where ancient cosmic blacksmiths craft weapons from the cores of dying stars. A hammer strike sends shockwaves of plasma through the nebulae, illuminating gigantic statues of forgotten deities who once wielded these legendary weapons.",
  "A post-apocalyptic underground city built within the ruins of a sunken skyscraper. The inhabitants, dressed in salvaged armor made from remnants of old technology, navigate the flooded streets in makeshift boats powered by steam engines. Above, a massive bio-mechanical leviathan lurks, its glowing tentacles reaching down into the depths.",
  "A surreal battlefield where warriors fight using shadows as weapons. The ground is a reflective black void, and every move they make creates ripples of distorted reality. In the distance, a massive eclipse looms, revealing an ancient entity watching from beyond space and time.",
  "An infinite library floating in a dimension between worlds, where bookshelves stretch endlessly in all directions. The air is filled with glowing letters that rearrange themselves midair. A ghostly librarian with a shifting, translucent form floats between the aisles, guiding a lone traveler who seeks the forbidden knowledge of lost civilizations.",
  "A high-tech city suspended above an endless ocean, connected by glowing skybridges. At the heart of the city, a massive AI core pulsates with energy, manipulating the weather and controlling robotic guardians. Below, hidden rebels in underwater caverns plot to deactivate the AI before it becomes fully self-aware.",
  "A grand cosmic chess match played on a planetary scale, where celestial beings move entire galaxies as pieces. The board itself is made of swirling constellations, and every move shifts the balance of the universe. A hooded figure with eyes like supernovas contemplates their next move while an ethereal clock counts down the end of time.",
  "A gigantic glass biodome floating above a black hole, housing an artificial ecosystem with bioluminescent trees and levitating rivers. Scientists in sleek, futuristic suits study a newly discovered species of translucent winged beings that communicate through pulses of light. Outside the dome, gravitational distortions create mesmerizing spirals in space."
];

function ImageSkeleton() {
  return (
    <div className="relative aspect-square rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden p-4">
      <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Generating...</p>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [prompt, setPrompt] = useState('');
  const [imageCount, setImageCount] = useState(1);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [customWidth, setCustomWidth] = useState<number>(1024);
  const [customHeight, setCustomHeight] = useState<number>(1024);
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const getRandomPrompt = () => {
    const randomPrompt = RANDOM_PROMPTS[Math.floor(Math.random() * RANDOM_PROMPTS.length)];
    setPrompt(randomPrompt);
  };

  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  // Helper function to create a delay between API calls
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Process a single image response
const processImageResponse = (response: { data?: { b64_json?: string }[] }): string | null => {
    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      console.error('Unexpected API response structure:', response);
      return null;
    }

    const imageData = response.data[0]; // Together AI only returns one image per request
    
    if (!imageData || !imageData.b64_json) {
      console.error('Invalid image data:', imageData);
      return null;
    }
    
    const b64Data = imageData.b64_json;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    
    for (let i = 0; i < byteCharacters.length; i += 512) {
      const slice = byteCharacters.slice(i, i + 512);
      const byteNumbers = new Array(slice.length);
      for (let j = 0; j < slice.length; j++) {
        byteNumbers[j] = slice.charCodeAt(j);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    
    const blob = new Blob(byteArrays, {type: 'image/png'});
    return URL.createObjectURL(blob);
  };

  async function query(data: { inputs: string, count: number }) {
    try {
      const allImageUrls: string[] = [];
      const delayBetweenRequests = 8000; // 10 seconds delay between requests
      
      // Make sequential API calls with delay between them
      for (let i = 0; i < data.count; i++) {
        // Show progress in console
        console.log(`Generating image ${i + 1} of ${data.count}...`);
        
        // Determine dimensions based on aspect ratio
        let width = 1024;
        let height = 768;
        
        // Set dimensions based on the selected aspect ratio
        if (aspectRatio === 'custom') {
          width = customWidth;
          height = customHeight;
        } else if (aspectRatio === '1:1') {
          width = 1024;
          height = 1024;
        } else if (aspectRatio === '16:9') {
          width = 1376;
          height = 768;
        } else if (aspectRatio === '9:16') {
          width = 768;
          height = 1376;
        }
        
        // Make API call for a single image
        const response = await together.images.create({
          model: MODEL,
          prompt: data.inputs,
          width: width,
          height: height,
          steps: 4,
          n: 1, // Always request 1 image per API call
          response_format: "base64"
        });
        
        console.log(`API Response for image ${i + 1}:`, response);
        
        // Process the image and add to results
        const imageUrl = processImageResponse(response);
        if (imageUrl) {
          allImageUrls.push(imageUrl);
          // Update the UI immediately with the new image
          setGeneratedImages([...allImageUrls]);
        }
        
        // Add delay before next request (except for the last one)
        if (i < data.count - 1) {
          await delay(delayBetweenRequests);
        }
      }
      
      console.log('All processed image URLs:', allImageUrls);
      return allImageUrls;
    } catch (error) {
      console.error('Error generating images:', error);
      throw error;
    }
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setGeneratedImages([]);

    try {
      // The query function now updates generatedImages state as each image completes
      await query({ inputs: prompt, count: imageCount });
      // We don't need to set generatedImages here as it's already updated in the query function
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
          <img src="/image.png" alt="image" className="w-15 h-16 text-violet-500" />
            <h1 className="text-2xl font-bold">ImageD</h1>
            <h2 className="text-sm text-gray-500">AI Image Generator</h2>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>

        {/* Main Content */}
        <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <form onSubmit={handleGenerate}>
            {/* Prompt Input */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="prompt" className="block text-sm font-medium">
                  Prompt
                </label>
                <button
                  type="button"
                  onClick={getRandomPrompt}
                  className="text-sm text-violet-500 hover:text-violet-600 flex items-center gap-1"
                >
                  <Sparkles className="w-4 h-4" />
                  Random Prompt
                </button>
              </div>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your imagination in detail..."
                className={`w-full h-32 p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                } border`}
              />
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Model Information */}
              <div className={`rounded-xl p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <label className="block text-sm font-medium mb-2">Model</label>
                <div className={`w-full p-2 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-200'
                } border`}>
                  FLUX.1 Schnell
                </div>
              </div>

              {/* Image Count */}
              <div className={`rounded-xl p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <label className="block text-sm font-medium mb-2">Image Count</label>
                <select
                  value={imageCount}
                  onChange={(e) => setImageCount(Number(e.target.value))}
                  className={`w-full p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-200'
                  } border`}
                >
                  {[1, 2, 3, 4].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              {/* Aspect Ratio */}
              <div className={`rounded-xl p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className={`w-full p-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-200'
                  } border mb-2`}
                >
                  <option value="1:1">Square (1:1)</option>
                  <option value="16:9">Landscape (16:9)</option>
                  <option value="9:16">Portrait (9:16)</option>
                  <option value="custom">Custom</option>
                </select>
                
                {aspectRatio === 'custom' && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">Width</label>
                      <input
                        type="number"
                        min="256"
                        max="1440"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(Number(e.target.value))}
                        className={`w-full p-2 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-200'
                        } border`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Height</label>
                      <input
                        type="number"
                        min="256"
                        max="1440"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(Number(e.target.value))}
                        className={`w-full p-2 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-200'
                        } border`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className={`w-full bg-violet-500 hover:bg-violet-600 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                (loading || !prompt.trim()) && 'opacity-50 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Wand2 className="w-5 h-5" />
              )}
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </form>

          {/* Preview Area */}
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Display already generated images */}
              {generatedImages.map((imageUrl, index) => (
                <div
                  key={`image-${index}`}
                  className={`relative rounded-xl overflow-hidden group ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt={`Generated image ${index + 1}`}
                    className="w-full h-auto"
                  />
                  <button
                    onClick={() => handleDownload(imageUrl, index)}
                    className="absolute bottom-4 right-4 p-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg shadow-lg transition-opacity opacity-0 group-hover:opacity-100 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {/* Display loading skeletons for remaining images */}
              {loading && Array(imageCount - generatedImages.length).fill(null).map((_, index) => (
                <ImageSkeleton key={`skeleton-${index}`} />
              ))}
              
              {/* Show empty state when no images and not loading */}
              {!loading && generatedImages.length === 0 && (
                <div className={`col-span-full rounded-xl p-8 border-2 border-dashed flex items-center justify-center ${
                  theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Your generated images will appear here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className={`mt-16 py-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/image.png" alt="image" className="w-10 h-10 text-violet-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">© 2025 ImageD By Dkidz. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-gray-500 hover:text-violet-500 dark:text-gray-400 dark:hover:text-violet-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-violet-500 dark:text-gray-400 dark:hover:text-violet-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-violet-500 dark:text-gray-400 dark:hover:text-violet-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
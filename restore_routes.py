import codecs

print("Restoring components and GSAP configs for split routes...")

try:
    # 1. Fix Spectacle
    with codecs.open('app/spectacle/page.tsx', 'r', 'utf-8') as f:
        spec = f.read()
    
    spec = spec.replace('overflow-hidden pt-20', 'pt-20')
    
    target = """    const rafId = requestAnimationFrame(() => {
      const blocks = textBlocksRef.current;

      blocks.forEach((block, index) => {
        if (!block) return;

        ScrollTrigger.create({
          trigger: block,
          start: "top 65%",
          end: "bottom 65%",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);"""

    repl = """    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const blocks = textBlocksRef.current;
      blocks.forEach((block, index) => {
        if (!block) return;

        ScrollTrigger.create({
          trigger: block,
          start: "top 65%",
          end: "bottom 65%",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);"""
  
    spec = spec.replace(target, repl)
    
    with codecs.open('app/spectacle/page.tsx', 'w', 'utf-8') as f:
        f.write(spec)
    print("Spectacle restored.")

    # 2. Extract from Descent and move to Taboo
    with codecs.open('app/descent/page.tsx', 'r', 'utf-8') as f:
        descent = f.read()

    evo_start = descent.find('const EvolutionAndArchitecture = () => {')
    if evo_start != -1:
        evo_def = descent[evo_start:]
        descent = descent[:evo_start]
        
        # fix Descent
        descent = descent.replace('overflow-hidden pt-20', 'pt-20')
        descent = descent.replace('      <EvolutionAndArchitecture />\r\n', '')
        descent = descent.replace('      <EvolutionAndArchitecture />\n', '')
        descent = descent.replace('if (!containerRef.current) return;\r\n\r\n    let ctx = gsap.context', 'if (!containerRef.current) return;\r\n    gsap.registerPlugin(ScrollTrigger);\r\n\r\n    let ctx = gsap.context')
        descent = descent.replace('if (!containerRef.current) return;\n\n    let ctx = gsap.context', 'if (!containerRef.current) return;\n    gsap.registerPlugin(ScrollTrigger);\n\n    let ctx = gsap.context')
        descent = descent.replace('if (!containerRef.current || !titleRef.current) return;\r\n\r\n    let ctx = gsap.context', 'if (!containerRef.current || !titleRef.current) return;\r\n    gsap.registerPlugin(ScrollTrigger);\r\n\r\n    let ctx = gsap.context')
        descent = descent.replace('if (!containerRef.current || !titleRef.current) return;\n\n    let ctx = gsap.context', 'if (!containerRef.current || !titleRef.current) return;\n    gsap.registerPlugin(ScrollTrigger);\n\n    let ctx = gsap.context')
        
        with codecs.open('app/descent/page.tsx', 'w', 'utf-8') as f:
            f.write(descent)
        print("Descent restored.")

        # fix Taboo
        with codecs.open('app/taboo/page.tsx', 'r', 'utf-8') as f:
            taboo = f.read()
            
        taboo = taboo.replace('overflow-hidden pt-20', 'pt-20')
        taboo = taboo.replace('<WitchcraftTaboo />', '<EvolutionAndArchitecture />\n      <WitchcraftTaboo />')
        taboo = taboo.replace('useEffect(() => {\r\n    // ── Fade-in-up for each content block ──', 'useEffect(() => {\r\n    gsap.registerPlugin(ScrollTrigger);\r\n    // ── Fade-in-up for each content block ──')
        taboo = taboo.replace('useEffect(() => {\n    // ── Fade-in-up for each content block ──', 'useEffect(() => {\n    gsap.registerPlugin(ScrollTrigger);\n    // ── Fade-in-up for each content block ──')
        
        taboo += '\n\n' + evo_def
        
        with codecs.open('app/taboo/page.tsx', 'w', 'utf-8') as f:
            f.write(taboo)
        print("Taboo restored.")

except Exception as e:
    print(f"Error: {e}")

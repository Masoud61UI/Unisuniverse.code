const expertiseData = {
  formal: {
    name: "Formal Sciences",
    subcategories: {
      mathematics: [
        "Algebra",
        "Calculus",
        "Probability",
        "Statistics",
        "Number Theory",
        "Applied Math",
        "Optimization",
        "Geometry",
      ],
      computer_science: [
        "Algorithms",
        "Databases",
        "Artificial Intelligence",
        "Programming Languages",
        "Software Engineering",
        "Human–Computer Interaction",
      ],
      logic: ["Symbolic Logic", "Critical Thinking", "Mathematical Logic"],
      systems_science: [
        "Cybernetics",
        "Complex Systems",
        "Information Theory",
        "Control Theory",
      ],
    },
  },
  natural: {
    name: "Natural Sciences",
    subcategories: {
      physics: [
        "Mechanics",
        "Thermodynamics",
        "Quantum Physics",
        "Optics",
        "Astrophysics",
        "Nuclear Physics",
      ],
      chemistry: [
        "Organic",
        "Inorganic",
        "Physical Chemistry",
        "Analytical Chemistry",
        "Biochemistry",
        "Materials Chemistry",
      ],
      biology: [
        "Molecular Biology",
        "Cell Biology",
        "Genetics",
        "Evolution",
        "Microbiology",
        "Botany",
        "Zoology",
        "Ecology",
      ],
      earth_sciences: [
        "Geology",
        "Meteorology",
        "Oceanography",
        "Paleontology",
        "Volcanology",
        "Hydrology",
      ],
      astronomy: [
        "Astrophysics",
        "Cosmology",
        "Planetary Science",
        "Space Exploration",
      ],
    },
  },
  life: {
    name: "Life & Medical Sciences",
    subcategories: {
      clinical_medicine: [
        "Internal Medicine",
        "Surgery",
        "Pediatrics",
        "Psychiatry",
        "Neurology",
        "Cardiology",
        "Dermatology",
      ],
      public_health: [
        "Epidemiology",
        "Biostatistics",
        "Health Policy",
        "Preventive Medicine",
      ],
      biomedical_sciences: [
        "Physiology",
        "Pathology",
        "Immunology",
        "Pharmacology",
        "Anatomy",
      ],
      allied_health_sciences: [
        "Nursing",
        "Midwifery",
        "Physiotherapy",
        "Nutrition & Dietetics",
        "Occupational Therapy",
        "Speech Therapy",
      ],
      veterinary_science: [
        "Animal Health",
        "Veterinary Surgery",
        "Zoonotic Diseases",
        "Comparative Medicine",
      ],
      pharmaceutical_sciences: [
        "Medicinal Chemistry",
        "Clinical Pharmacy",
        "Pharmacognosy",
        "Pharmacovigilance",
      ],
    },
  },
  engineering: {
    name: "Engineering & Applied Sciences",
    subcategories: {
      civil_engineering: [
        "Structural",
        "Environmental",
        "Transportation",
        "Geotechnical",
      ],
      mechanical_engineering: [
        "Thermodynamics",
        "Fluid Mechanics",
        "Robotics",
        "Manufacturing",
      ],
      electrical_electronic_engineering: [
        "Power Systems",
        "Signal Processing",
        "Microelectronics",
        "Telecommunications",
      ],
      chemical_engineering: [
        "Process Engineering",
        "Materials",
        "Biochemical Engineering",
      ],
      industrial_systems_engineering: [
        "Operations Research",
        "Human Factors",
        "Logistics Engineering",
      ],
      aerospace_engineering: ["Aerodynamics", "Avionics", "Space Engineering"],
      materials_science_engineering: [
        "Nanomaterials",
        "Polymers",
        "Composites",
        "Metallurgy",
      ],
      environmental_engineering: [
        "Waste Management",
        "Renewable Energy Systems",
        "Water Engineering",
      ],
    },
  },
  social: {
    name: "Social Sciences",
    subcategories: {
      economics: [
        "Microeconomics",
        "Macroeconomics",
        "Development",
        "Behavioral Economics",
        "Econometrics",
      ],
      political_science: [
        "Governance",
        "Policy Studies",
        "International Relations",
        "Conflict Resolution",
        "Diplomacy",
      ],
      sociology: [
        "Social Theory",
        "Inequality",
        "Gender Studies",
        "Migration",
        "Family Studies",
      ],
      psychology: [
        "Clinical",
        "Cognitive",
        "Behavioral",
        "Developmental",
        "Social",
        "Industrial/Organizational",
      ],
      anthropology: [
        "Cultural Anthropology",
        "Archaeology",
        "Linguistic Anthropology",
        "Biological Anthropology",
      ],
      education: [
        "Curriculum",
        "Pedagogy",
        "Educational Technology",
        "Assessment",
      ],
      law_criminology: [
        "Criminal Law",
        "Civil Law",
        "Human Rights",
        "Forensic Studies",
      ],
    },
  },
  humanities: {
    name: "Humanities",
    subcategories: {
      history: [
        "Ancient",
        "Medieval",
        "Modern",
        "Regional Histories",
        "Historiography",
      ],
      philosophy: [
        "Ethics",
        "Metaphysics",
        "Epistemology",
        "Political Philosophy",
        "Aesthetics",
      ],
      linguistics_languages: [
        "Syntax",
        "Semantics",
        "Phonology",
        "Applied Linguistics",
        "Translation Studies",
      ],
      literature: [
        "Comparative Literature",
        "Literary Criticism",
        "Poetry",
        "Drama",
        "Prose Studies",
      ],
      religious_studies_theology: [
        "Comparative Religion",
        "Theology",
        "Philosophy of Religion",
        "Sacred Texts",
      ],
      arts: [
        "Fine Arts",
        "Performing Arts",
        "Musicology",
        "Film Studies",
        "Art History",
      ],
    },
  },
  interdisciplinary: {
    name: "Interdisciplinary & Emerging Fields",
    subcategories: {
      environmental_sustainability_studies: [
        "Climate Change",
        "Conservation",
        "ESG",
        "Circular Economy",
      ],
      cognitive_science: [
        "Mind",
        "Language",
        "Artificial Intelligence",
        "Neuroscience",
      ],
      neuroscience: [
        "Cognitive Neuroscience",
        "Neuroimaging",
        "Neurobiology",
        "Neuropsychology",
      ],
      data_science_big_data: [
        "Machine Learning",
        "Data Mining",
        "Predictive Analytics",
        "Cloud Computing",
      ],
      robotics_automation: [
        "Human–Robot Interaction",
        "Industrial Robotics",
        "AI-driven Automation",
      ],
      gender_cultural_studies: [
        "Feminist Studies",
        "Queer Studies",
        "Postcolonial Studies",
        "Popular Culture",
      ],
      global_development_studies: [
        "Globalization",
        "International Development",
        "Humanitarian Studies",
        "Migration",
      ],
      communication_media_studies: [
        "Journalism",
        "Mass Communication",
        "Digital Media",
        "Public Relations",
      ],
    },
  },
  other: {
    name: "Other",
    subcategories: {
      other: ["Custom Keyword 1", "Custom Keyword 2"],
    },
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const expertiseSelect = document.getElementById("expertise");
  const subCategorySelect = document.getElementById("subCategory");
  const suggestedTagsContainer = document.getElementById("suggested-tags");
  const tagInputContainer = document.getElementById("tag-input-container");
  const tagInput = document.getElementById("tag-input");

  const resetTags = () => {
    tagInputContainer.querySelectorAll(".tag").forEach((tag) => tag.remove());
    tagInput.value = "";
  };

  const disableTagInput = () => {
    tagInput.disabled = true;
    tagInput.placeholder = "Please select a sub-category first";
    resetTags();
  };

  const enableTagInput = () => {
    tagInput.disabled = false;
    tagInput.placeholder = "Add a keyword +";
  };

  const resetSubCategory = () => {
    subCategorySelect.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.hidden = true;
    defaultOption.textContent = "Select sub-category";
    subCategorySelect.appendChild(defaultOption);
  };

  const showSuggestedTags = (keywords) => {
    suggestedTagsContainer.innerHTML = "";
    keywords.forEach((keyword) => {
      const tagOption = document.createElement("div");
      tagOption.className = "tag-option";
      tagOption.setAttribute("data-tag", keyword);
      tagOption.textContent = keyword;
      suggestedTagsContainer.appendChild(tagOption);
    });
  };

  expertiseSelect.addEventListener("change", function () {
    const selectedExpertise = this.value;

    disableTagInput();
    resetSubCategory();
    suggestedTagsContainer.innerHTML =
      "<p>Please select a sub-category to see suggested keywords</p>";

    if (expertiseData[selectedExpertise]) {
      subCategorySelect.disabled = false;

      if (selectedExpertise === "other") {
        const option = document.createElement("option");
        option.value = "other";
        option.textContent = "Other";
        option.selected = true;
        subCategorySelect.appendChild(option);

        enableTagInput();
        suggestedTagsContainer.innerHTML = "<p>Enter your custom keywords</p>";
      } else {
        for (const [key] of Object.entries(
          expertiseData[selectedExpertise].subcategories
        )) {
          const option = document.createElement("option");
          option.value = key;
          option.textContent = key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
          subCategorySelect.appendChild(option);
        }
      }
    }
  });

  subCategorySelect.addEventListener("change", function () {
    const selectedExpertise = expertiseSelect.value;
    const selectedSubCategory = this.value;

    if (selectedExpertise === "other") {
      enableTagInput();
      suggestedTagsContainer.innerHTML = "<p>Enter your custom keywords</p>";
      return;
    }

    enableTagInput();
    resetTags();

    if (expertiseData[selectedExpertise]?.subcategories[selectedSubCategory]) {
      showSuggestedTags(
        expertiseData[selectedExpertise].subcategories[selectedSubCategory]
      );
    }
  });

  const createTag = (text) => {
    if (
      [...tagInputContainer.querySelectorAll(".tag")].some((tag) =>
        tag.textContent.includes(text)
      )
    )
      return;

    const tag = document.createElement("div");
    tag.className = "tag";
    tag.innerHTML = `<span class="tag-remove">×</span>${text}`;

    tagInput.parentNode.insertBefore(tag, tagInput);

    tag.querySelector(".tag-remove").addEventListener("click", function () {
      tag.remove();
      tagInput.focus();
    });
  };

  suggestedTagsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("tag-option")) {
      createTag(e.target.getAttribute("data-tag"));
      tagInput.focus();
    }
  });

  tagInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && this.value.trim() !== "") {
      e.preventDefault();
      createTag(this.value.trim());
      this.value = "";
      this.focus();
    }
  });

  disableTagInput();
});

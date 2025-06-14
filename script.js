// Dados das escolas carregados do arquivo JSON
let schoolsData = [];

// Função para carregar dados do arquivo JSON
async function loadSchoolsData() {
  try {
    const response = await fetch("escolas.json");
    if (!response.ok) {
      throw new Error("Erro ao carregar dados das escolas");
    }
    schoolsData = await response.json();
    console.log(`${schoolsData.length} escolas carregadas do arquivo JSON`);

    // Mostra todas as escolas inicialmente
    setTimeout(() => {
      filteredResults = schoolsData;
      displayResults();
    }, 500);
  } catch (error) {
    console.error("Erro ao carregar escolas:", error);

    setTimeout(() => {
      filteredResults = schoolsData;
      displayResults();
    }, 500);
  }
}

let currentFilters = {};
let filteredResults = [];

const searchForm = document.getElementById("searchForm");
const resultsContainer = document.getElementById("resultsContainer");
const resultsCount = document.getElementById("resultsCount");
const filterTags = document.getElementById("filterTags");

searchForm.addEventListener("submit", handleSearch);

function handleSearch(e) {
  e.preventDefault();

  const formData = new FormData(searchForm);
  const filters = {
    schoolName: document.getElementById("schoolName").value.toLowerCase(),
    address: document.getElementById("address").value.toLowerCase(),
    schoolType: document.getElementById("schoolType").value,
  };

  currentFilters = Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => value !== "")
  );

  showLoading();

  // Simula delay da API
  setTimeout(() => {
    performSearch(filters);
  }, 1000);
}

function performSearch(filters) {
  filteredResults = schoolsData.filter((school) => {
    let matches = true;

    if (
      filters.schoolName &&
      !school.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(filters.schoolName)
    ) {
      matches = false;
    }

    if (
      filters.address &&
      !school.address.toLowerCase().includes(filters.address)
    ) {
      matches = false;
    }

    if (filters.schoolType && school.type !== filters.schoolType) {
      matches = false;
    }

    return matches;
  });

  displayResults();
  updateFilterTags();
}

function showLoading() {
  resultsContainer.innerHTML = `
                <div class="loading">
                    <div class="loading-spinner"></div>
                    <p>Buscando escolas...</p>
                </div>
            `;
  resultsCount.textContent = "Carregando...";
}

function displayResults() {
  const count = filteredResults.length;
  resultsCount.textContent = `${count} escola${
    count !== 1 ? "s" : ""
  } encontrada${count !== 1 ? "s" : ""}`;

  if (count === 0) {
    resultsContainer.innerHTML = `
                    <div class="no-results">
                        <div class="no-results-icon">🔍</div>
                        <h3>Nenhuma escola encontrada</h3>
                        <p>Tente ajustar os filtros de pesquisa</p>
                    </div>
                `;
    return;
  }

  const schoolsHTML = filteredResults
    .map(
      (school) => `
                <div class="school-card">
                    <div class="school-header">
                        <div class="school-name">${school.name}</div>
                        <div class="school-type">${getTypeLabel(
                          school.type
                        )}</div>
                    </div>
                    <div class="school-body">
                        <div class="school-info">
                            <span class="info-label">📍 Endereço:</span>
                            <span class="info-value">${school.address}</span>
                        </div>
                        <div class="school-info">
                            <span class="info-label">📞 Telefone:</span>
                            <span class="info-value">${school.phone}</span>
                        </div>
                    </div>
                </div>
            `
    )
    .join("");

  resultsContainer.innerHTML = `<div class="school-grid">${schoolsHTML}</div>`;
}

function getTypeLabel(type) {
  const labels = {
    fundamental: "Ensino Fundamental",
    infantil: "Educação Infantil",
  };
  return labels[type] || type;
}

function updateFilterTags() {
  const tags = Object.entries(currentFilters)
    .map(([key, value]) => {
      const label = getFilterLabel(key, value);
      return `
                    <div class="filter-tag">
                        ${label}
                        <button type="button" onclick="removeFilter('${key}')">&times;</button>
                    </div>
                `;
    })
    .join("");

  filterTags.innerHTML = tags;
}

function getFilterLabel(key, value) {
  const labels = {
    schoolName: `Nome: "${value}"`,
    address: `Endereço: "${value}"`,
    schoolType: `Tipo: ${getTypeLabel(value)}`,
    region: `Região: ${value.charAt(0).toUpperCase() + value.slice(1)}`,
  };
  return labels[key] || `${key}: ${value}`;
}

function removeFilter(filterKey) {
  delete currentFilters[filterKey];
  document.getElementById(filterKey).value = "";

  if (Object.keys(currentFilters).length === 0) {
    resultsContainer.innerHTML = "";
    resultsCount.textContent = "Digite os critérios e clique em buscar";
    filterTags.innerHTML = "";
  } else {
    performSearch(currentFilters);
  }
}

// Busca inicial para mostrar algumas escolas
setTimeout(() => {
  performSearch({});
}, 500);

document.addEventListener('DOMContentLoaded', () => {
  loadSchoolsData();
});

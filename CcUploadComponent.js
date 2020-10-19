class CcUploadComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    globalLabelCount++;
    this.style.display = "inline-block";
    var label = this.getAttribute("label") || "Bitte Dateien auswählen";
    this.innerHTML = `<input type="file" id="fileElem-${globalLabelCount}" multiple accept="*/*" aria-labelledby="cc-mdc-label-${globalLabelCount}"
      style="position: absolute !important;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);">
    <button class="mdc-button mdc-button--raised">
      <label for="fileElem-${globalLabelCount}" style="cursor:pointer;display:inline-block;height:34px;line-height:34px;vertical-align:center;" class="mdc-button__label">${label}</label>
    </button>
`;

    this.input = this.querySelector("input");
    this.input.addEventListener("change", (e) => { this.handleFiles(e.target.files); }, false);
    this.label = this.querySelector("label");
    this.label.addEventListener("dragenter", (e) => { e.stopPropagation(); e.preventDefault(); }, false);
    this.label.addEventListener("dragover", (e) => { e.stopPropagation(); e.preventDefault(); }, false);
    this.label.addEventListener("drop", (e) => {this.drop(e); }, false);
  }

  drop(e) {
    e.stopPropagation();
    e.preventDefault();
    var dt = e.dataTransfer;
    this.handleFiles(dt.files);
  }

  handleFiles(files) {
    this.dispatchEvent(new CustomEvent("files", { detail: files}));
  }
}

window.customElements.define("cc-upload-component", CcUploadComponent);

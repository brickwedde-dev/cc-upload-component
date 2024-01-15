class CcUploadComponent extends HTMLElement {
  constructor() {
    super();
    this.labeltext = null;
    this.icon = null;
    this.upload = null;
    this.iconFontSize = 24;
  }

  connectedCallback() {
    globalLabelCount++;

    this.style.display = "inline-block";
    if (this.icon) {
      this.innerHTML = `<input type="file" id="fileElem-${globalLabelCount}" multiple accept="*/*" aria-labelledby="cc-mdc-label-${globalLabelCount}"
        style="position: absolute !important;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);">
        <label for="fileElem-${globalLabelCount}" style="cursor:pointer;display:inline-block;height:${this.iconFontSize}px;line-height:${this.iconFontSize}px;vertical-align:center;"><i class="material-icons mdc-button__icon" style="font-size:${this.iconFontSize}px;" aria-hidden="true">${this.icon}</i></label>`;
    } else {
      var label = this.labeltext || this.getAttribute("label") || "Bitte Dateien auswählen";
      this.innerHTML = `<input type="file" id="fileElem-${globalLabelCount}" multiple accept="*/*" aria-labelledby="cc-mdc-label-${globalLabelCount}"
        style="position: absolute !important;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);">
      <button class="mdc-button mdc-button--raised">
        <label for="fileElem-${globalLabelCount}" style="cursor:pointer;display:inline-block;height:34px;line-height:34px;vertical-align:center;" class="mdc-button__label">${label}</label>
      </button>
  `;
    }

    this.input = this.querySelector("input");
    this.input.addEventListener("change", (e) => { this.handleFiles(e.target.files); e.target.value = "";}, false);
    
    this.label = this.querySelector("label");
    this.label.addEventListener("dragenter", (e) => { e.stopPropagation(); e.preventDefault(); }, false);
    this.label.addEventListener("dragover", (e) => { e.stopPropagation(); e.preventDefault(); }, false);
    this.label.addEventListener("drop", (e) => {this.drop(e); }, false);
  }

  drop(e) {
    e.stopPropagation();
    e.preventDefault();
    var dt = e.dataTransfer;
    this.handleFiles(dt.files, dt);
  }

  doUpload() {
    return new Promise((resolve, reject) => {
      if (this.upload) {
        var reader = new FileReader();
        reader.onloadend = () => {
          var base64data = reader.result;
          var options = JSON.parse(JSON.stringify(this.upload.options));
          options.body = JSON.stringify({ content: base64data, filename: this.upload.filename ? this.upload.filename : this._files[0].name });
  
          fetch(this.upload.url, options)
          .then((response) => {
            if (!response.ok) {
              reject(new Error('Network response was not ok'));
            }
            resolve();
          });
        };
        reader.readAsDataURL(this._files[0]);
      }
    });
  }

  handleFiles(files, dataTransfer) {
    this._files = files;
    this.dispatchEvent(new CustomEvent("files", { detail: files}));
    this.dispatchEvent(new CustomEvent("dataTransfer", { detail: { dataTransfer }}));
  }

  openFileDialog() {
    this.input.click();
  }
}

window.customElements.define("cc-upload-component", CcUploadComponent);


class CcUploadComponent2 extends HTMLElement {
  constructor() {
    super();
    this.labeltext = null;
    this.icon = null;
    this.upload = null;
    this.iconFontSize = 24;
  }

  connectedCallback() {
    globalLabelCount++;

    var label = this.labeltext || this.getAttribute("label") || "";
    var icon = this.icon || this.getAttribute("icon") || "";
    var iconFontSize = this.getAttribute("iconFontSize") || this.iconFontSize;

    var hasFontSize = ("" + this.style.fontSize).indexOf("p") > 0;
    var hasWidth = ("" + this.style.width).indexOf("px") > 0;
    var hasHeight = ("" + this.style.height).indexOf("px") > 0;

    this.style.display = "inline-block";
    if (icon && label) {
      this.innerHTML = `<input type="file" id="fileElem-${globalLabelCount}" multiple accept="*/*" aria-labelledby="cc-mdc-label-${globalLabelCount}" style="position: absolute !important;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);">
        <label for="fileElem-${globalLabelCount}">
          <div style="display:inline-flex;vertical-align:middle;${hasWidth ? `width:100%;` : ``}${hasHeight ? `height:100%;` : ``}${hasFontSize ? `font-size:${this.style.fontSize};` : ``}" class="mdc-button mdc-button--raised">
            <i class="material-icons mdc-button__icon" aria-hidden="true" style="display:block;cursor:pointer;">${icon}</i>
            <span class="mdc-button__label" style="display:block;cursor:pointer;">${label}</span>
          </div>
        </label>
      `;
    } else if (icon) {
      this.innerHTML = `<input type="file" id="fileElem-${globalLabelCount}" multiple accept="*/*" aria-labelledby="cc-mdc-label-${globalLabelCount}"
        style="position: absolute !important;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);">
        <label for="fileElem-${globalLabelCount}" style="cursor:pointer;display:inline-block;height:${iconFontSize}px;line-height:${iconFontSize}px;vertical-align:center;"><i class="material-icons mdc-button__icon" style="font-size:${iconFontSize}px;" aria-hidden="true">${icon}</i></label>`;
    } else {
      this.innerHTML = `<input type="file" id="fileElem-${globalLabelCount}" multiple accept="*/*" aria-labelledby="cc-mdc-label-${globalLabelCount}"
        style="position: absolute !important;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);">
      <button style="${hasWidth ? `width:100%;` : ``}${hasHeight ? `height:100%;` : ``}${hasFontSize ? `font-size:${this.style.fontSize};` : ``}" class="mdc-button mdc-button--raised">
        <label for="fileElem-${globalLabelCount}" style="cursor:pointer;display:inline-block;height:34px;line-height:34px;vertical-align:center;" class="mdc-button__label">${label || t9n`Upload`}</label>
      </button>
  `;
    }

    this.input = this.querySelector("input");
    this.input.addEventListener("change", (e) => { this.handleFiles(e.target.files); e.target.value = "";}, false);
    
    this.label = this.querySelector("button") || this.querySelector("label");
    this.label.addEventListener("dragenter", (e) => { e.stopPropagation(); e.preventDefault(); }, false);
    this.label.addEventListener("dragover", (e) => { e.stopPropagation(); e.preventDefault(); }, false);
    this.label.addEventListener("drop", (e) => {this.drop(e); }, false);
  }

  drop(e) {
    e.stopPropagation();
    e.preventDefault();
    var dt = e.dataTransfer;
    this.handleFiles(dt.files, dt);
  }

  doUpload() {
    return new Promise((resolve, reject) => {
      if (this.upload) {
        var reader = new FileReader();
        reader.onloadend = () => {
          var base64data = reader.result;
          var options = JSON.parse(JSON.stringify(this.upload.options));
          options.body = JSON.stringify({ content: base64data, filename: this.upload.filename ? this.upload.filename : this._files[0].name });
  
          fetch(this.upload.url, options)
          .then((response) => {
            if (!response.ok) {
              reject(new Error('Network response was not ok'));
            }
            resolve();
          });
        };
        reader.readAsDataURL(this._files[0]);
      }
    });
  }

  handleFiles(files, dataTransfer) {
    this._files = files;
    this.dispatchEvent(new CustomEvent("files", { detail: files}));
    if (!dataTransfer) {
      dataTransfer = { files };
    }
    this.dispatchEvent(new CustomEvent("dataTransfer", { detail: { dataTransfer, files }}));
  }

  openFileDialog() {
    this.input.click();
  }
}

window.customElements.define("cc-upload-component2", CcUploadComponent2);

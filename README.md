# PDFOCR

## Azure Cognitive Services OCR for PDFs

This code is deployed to a container image on Docker Hub at 
[https://hub.docker.com/r/richtercloud/pdfocr]()

### To run it locally with Docker you can use this

```bash
docker run -e PDFURL=https://toggl.com/landing/files/editable-invoice-template.pdf -e OCRURL=https://eastus.api.cognitive.microsoft.com/vision/v2.0/ocr -e OCRKEY=<YOURKEY> richtercloud/pdfocr 
```
OR like this
```bash
docker run richtercloud/pdfocr https://toggl.com/landing/files/editable-invoice-template.pdf https://eastus.api.cognitive.microsoft.com/vision/v2.0/ocr <YOURKEY>
```
The OCRURL can be any valid Azure Cognitive Services computer vision endpoint.

### You can run it outside a container too. You will need Node JS and GraphicsMagick installed locally.

### To try it on Azure, you can use Azure Container Instances, like this:
```bash
az container create --resource-group myRG --name myContainer --image richtercloud/pdfocr --restart-policy Never --environment-variables PDFURL=https://toggl.com/landing/files/editable-invoice-template.pdf OCRURL=https://eastus.api.cognitive.microsoft.com/vision/v2.0/ocr OCRKEY=<YOURKEY>
```
once it runs, get the output with ACI logs like this
```bash
az container logs --resource-group myRG --name myContainer
```
### To learn more
* [Azure Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/)
* [Partner with Microsoft](https://partner.microsoft.com/en-US/)

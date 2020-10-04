<?php


namespace Drupal\pdf_slideshow\Manager;

use Drupal\Core\Render\Renderer;
use Drupal\pdf_slideshow\Gateway\PdfSlideshowEntityGateway;

/**
 * Class PdfSlideshowRenderManager.
 *
 * @package Drupal\pdf_slideshow\Manager
 */
class PdfSlideshowRenderManager {

  /**
   * Renderer.
   *
   * @var \Drupal\Core\Render\Renderer
   */
  protected $renderer;

  /**
   * PdfSlideshowImageManager.
   *
   * @var \Drupal\pdf_slideshow\Manager\PdfSlideshowImageManager
   */
  protected $pdfSlideShowImageManager;

  /**
   * PdfSlideshowEntityGateway.
   *
   * @var \Drupal\pdf_slideshow\Gateway\PdfSlideshowEntityGateway
   */
  protected $pdfSlideshowEntityGateway;

  /**
   * PdfSlideshowRenderManager constructor.
   *
   * @param \Drupal\Core\Render\Renderer $renderer
   *   Renderer.
   * @param \Drupal\pdf_slideshow\Manager\PdfSlideshowImageManager $pdfSlideShowImageManager
   *   PdfSlideshowImageManager.
   * @param \Drupal\pdf_slideshow\Gateway\PdfSlideshowEntityGateway $pdfSlideshowEntityGateway
   *   PdfSlideshowEntityGateway.
   */
  public function __construct(Renderer $renderer, PdfSlideshowImageManager $pdfSlideShowImageManager, PdfSlideshowEntityGateway $pdfSlideshowEntityGateway) {
    $this->renderer = $renderer;
    $this->pdfSlideShowImageManager = $pdfSlideShowImageManager;
    $this->pdfSlideshowEntityGateway = $pdfSlideshowEntityGateway;
  }

  /**
   * HTML slideshow render.
   *
   * @param array $pdfFileIds
   *   PDF file ids.
   * @param string $width
   *   Image width.
   * @param string $height
   *   Image height.
   * @param mixed $limit
   *   Tweet limit.
   *
   * @return \Drupal\Component\Render\MarkupInterface|string|null
   *   HMTL markup.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   * @throws \ImagickException
   */
  public function renderHtmlSlideshow(array $pdfFileIds, $width, $height, $limit) {

    $entities = $this->pdfSlideshowEntityGateway->fetchFileEntities($pdfFileIds);
    if ($entities) {
      $slidesArray = $this->pdfSlideShowImageManager->getPdfImageUrls($entities,
        $width,
        $height,
        $limit);

      $renderArray = [
        '#theme' => 'pdf_slideshow',
        '#slides' => $slidesArray,
        '#attached' => [
          'library' => [
            'pdf_slideshow/pdf-slideshow',
          ],
        ],
      ];
      return $this->renderer->render($renderArray);
    }
    return NULL;
  }

}

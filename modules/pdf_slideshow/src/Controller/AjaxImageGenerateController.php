<?php

namespace Drupal\pdf_slideshow\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\pdf_slideshow\Manager\PdfSlideshowRenderManager;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class AjaxImageGenerateController.
 */
class AjaxImageGenerateController extends ControllerBase {

  /**
   * @var \Drupal\pdf_slideshow\Manager\PdfSlideshowRenderManager
   */
  protected $pdfSlideshowRenderManager;

  /**
   * AjaxImageGenerateController constructor.
   *
   * @param \Drupal\pdf_slideshow\Manager\PdfSlideshowRenderManager $pdfSlideshowRenderManager
   *   Pdf slideshow render manager.
   */
  public function __construct(PdfSlideshowRenderManager $pdfSlideshowRenderManager) {
    $this->pdfSlideshowRenderManager = $pdfSlideshowRenderManager;
  }

  /**
   * Ajax render.
   *
   * @param string $pdfFileIds
   *   PDF file ids string.
   * @param int|string $width
   *   Image width.
   * @param int|string $height
   *   Image height.
   * @param int|string $limit
   *   Image slide limit.
   *
   * @return \Symfony\Component\HttpFoundation\Response
   *   Response.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   * @throws \ImagickException
   */
  public function ajaxRender(string $pdfFileIds, $width, $height, $limit) {
    $html = $this->pdfSlideshowRenderManager->renderHtmlSlideshow(explode('_',
      $pdfFileIds),
      $width,
      $height,
      $limit);
    return new Response($html);
  }

}

<?php

namespace Drupal\pdf_slideshow\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Messenger\Messenger;
use Drupal\Core\Url;
use Drupal\pdf_slideshow\Manager\PdfSlideshowImageManager;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Class ListController.
 */
class ListController extends ControllerBase {

  /**
   * PdfSlideshowImageManager.
   *
   * @var \Drupal\pdf_slideshow\Manager\PdfSlideshowImageManager
   */
  protected $pdfSlideshowImageManager;

  /**
   * @var \Drupal\Core\Messenger\Messenger
   */
  protected $messenger;

  /**
   * ListController constructor.
   *
   * @param \Drupal\pdf_slideshow\Manager\PdfSlideshowImageManager $pdfSlideshowImageManager
   *   PdfSlideshowImageManager.
   * @param \Drupal\Core\Messenger\Messenger $messenger
   */
  public function __construct(PdfSlideshowImageManager $pdfSlideshowImageManager, Messenger $messenger) {
    $this->pdfSlideshowImageManager = $pdfSlideshowImageManager;
    $this->messenger = $messenger;
  }

  /**
   * List.
   *
   * @return array
   *   Renderable array.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function list() {
    $list = $this->pdfSlideshowImageManager->getAllList();
    return [
      '#theme' => 'pdf_list',
      '#items' => $list,
    ];
  }

  /**
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function delete() {
    $deletedFilesNumb = $this->pdfSlideshowImageManager->emptyImages();
    $this->messenger->addMessage($deletedFilesNumb . ' image(s) deleted');
    return new RedirectResponse(Url::fromRoute('pdf_slideshow.list_controller_list')
      ->toString());
  }

}

<?php

namespace Drupal\pdf_slideshow\Manager;

use Drupal\pdf_slideshow\Gateway\PdfSlideshowEntityGateway;
use Drupal\pdf_slideshow\Gateway\PdfSlideshowStorageGateway;

/**
 * Class PdfSlideshowImageManager.
 *
 * @package Drupal\pdf_slideshow\Manager
 */
class PdfSlideshowImageManager {

  /**
   * PdfSlideshowManager.
   *
   * @var \Drupal\pdf_slideshow\Gateway\PdfSlideshowStorageGateway
   */
  protected $pdfSlideshowStorageGateway;

  /**
   * PdfSlideshowEntityGateway.
   *
   * @var \Drupal\pdf_slideshow\Gateway\PdfSlideshowEntityGateway
   */
  protected $pdfSlideshowEntityGateway;

  /**
   * PdfSlideshowManager constructor.
   *
   * @param \Drupal\pdf_slideshow\Gateway\PdfSlideshowStorageGateway $pdfSlideshowStorageGateway
   *   PdfSlideshowStorageGateway.
   * @param \Drupal\pdf_slideshow\Gateway\PdfSlideshowEntityGateway $pdfSlideshowEntityGateway
   *   PdfSlideshowEntityGateway.
   */
  public function __construct(PdfSlideshowStorageGateway $pdfSlideshowStorageGateway, PdfSlideshowEntityGateway $pdfSlideshowEntityGateway) {
    $this->pdfSlideshowStorageGateway = $pdfSlideshowStorageGateway;
    $this->pdfSlideshowEntityGateway = $pdfSlideshowEntityGateway;
  }

  /**
   * Get pdf image url.
   *
   * @param array $fileEntities
   *   File entities.
   * @param int|string $width
   *   Width.
   * @param int|string $height
   *   Height.
   * @param int|string $limit
   *   Limit.
   *
   * @return array|null
   *   Pdf files urls.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   * @throws \ImagickException
   */
  public function getPdfImageUrls(array $fileEntities, $width, $height, $limit) {
    $output = [];
    foreach ($fileEntities as $fileEntity) {
      $pdfImagesId = $this->pdfSlideshowStorageGateway->fetchPdfImageIds($fileEntity->id());
      if ($pdfImagesId) {
        $urls = $this->pdfSlideshowEntityGateway->fetchPdfFileImageUrls($pdfImagesId);
        if (count($urls) != intval($limit)) {
          $urls = $this->pdfSlideshowStorageGateway->persistPdfImageIds($fileEntity,
            $width,
            $height,
            $limit);
        }
      }
      else {
        $urls = $this->pdfSlideshowStorageGateway->persistPdfImageIds($fileEntity,
          $width,
          $height,
          $limit);
      }
      $output[] = $urls;
    }
    return $output;
  }

  /**
   * Get list.
   *
   * @return mixed
   *   Generated file list.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function getAllList() {
    $list = $this->pdfSlideshowStorageGateway->fetchAll();
    foreach ($list as $key => $item) {
      $fileEntities = $this->pdfSlideshowEntityGateway->fetchFileEntities([$item->pdf_file_id]);
      if ($fileEntities) {
        $list[$key]->pdf_file_id = [
          'url' => reset($fileEntities)->getFileUri(),
          'id' => $item->pdf_file_id,
        ];
      }
      $fileEntities = $this->pdfSlideshowEntityGateway->fetchFileEntities([$item->image_file_id]);
      if ($fileEntities) {
        $list[$key]->image_file_id = [
          'url' => reset($fileEntities)->getFileUri(),
          'id' => $item->image_file_id,
        ];
      }
    }
    return $list;
  }

  /**
   * @return int
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function emptyImages() {
    $filesList = $this->pdfSlideshowStorageGateway->fetchAll();
    $filesIdList = [];
    foreach ($filesList as $file) {
      $filesIdList[] = $file->image_file_id;
    }
    return $this->pdfSlideshowStorageGateway->removeImages($filesIdList);
  }

  /**
   * @param $fid
   *
   * @return mixed
   */
  public function getFileById($fid) {
    return $this->pdfSlideshowStorageGateway->fetchImageFileById($fid);
  }

}

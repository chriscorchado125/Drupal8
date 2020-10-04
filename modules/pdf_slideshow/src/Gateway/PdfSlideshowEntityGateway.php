<?php

namespace Drupal\pdf_slideshow\Gateway;

use Drupal\Core\Entity\EntityTypeManager;

/**
 * Class PdfSlideshowEntityGateway.
 *
 * @package Drupal\pdf_slideshow\Gateway
 */
class PdfSlideshowEntityGateway {

  /**
   * @var \Drupal\Core\Entity\EntityTypeManager
   */
  protected $entityTypeManager;

  /**
   * PdfSlideshowEntityGateway constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManager $entityTypeManager
   *   Entity type manager.
   */
  public function __construct(EntityTypeManager $entityTypeManager) {
    $this->entityTypeManager = $entityTypeManager;
  }

  /**
   * Create file entity from unmanaged image files.
   *
   * @param array $filePaths
   *   File path.
   *
   * @return array|null|
   *   File entity ids.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function createFileEntities(array $filePaths) {
    if ($filePaths) {
      $fids = [];
      foreach ($filePaths as $filePath) {
        $fileEntity = $this->entityTypeManager->getStorage('file')->create([
          'uri' => $filePath,
          'status' => FILE_STATUS_PERMANENT,
        ]);
        $fileEntity->set('uri', file_create_url($filePath));
        $fileEntity->save();
        $fids[] = $fileEntity->id();
      }
      return $fids;
    }
    return NULL;
  }

  /**
   * Get pdf file image urls from field ids.
   *
   * @param array $fids
   *   File ids.
   *
   * @return array|null
   *   File urls.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function fetchPdfFileImageUrls(array $fids) {
    $files = $this->entityTypeManager->getStorage('file')->loadMultiple($fids);
    $fileUrls = [];
    foreach ($files as $file) {
      $url = str_replace($_SERVER['DOCUMENT_ROOT'] . '/',
        '',
        $file->getFileUri());
      $fileUrls[] = $url;
    }
    return $fileUrls ? $fileUrls : NULL;
  }

  /**
   * Get file entity from file ids.
   *
   * @param array $fileIds
   *   File ids.
   *
   * @return \Drupal\Core\Entity\EntityInterface[]
   *   Entity array;
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function fetchFileEntities(array $fileIds) {
    return $this->entityTypeManager->getStorage('file')->loadMultiple($fileIds);
  }

  /**
   * @param array $fileIds
   *
   * @return int|void
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function deleteFileEntities(array $fileIds) {
    $fileEntities = $this->entityTypeManager->getStorage('file')
      ->loadMultiple($fileIds);
    foreach ($fileEntities as $fileEntity) {
      $fileEntity->delete();
    }
    return count($fileIds);
  }

}

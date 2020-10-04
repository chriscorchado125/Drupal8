<?php

namespace Drupal\pdf_slideshow\Gateway;

use Drupal\Core\Database\Database;
use Drupal\Core\File\FileSystem;
use Drupal\pdf_slideshow\Manager\PdfSlideshowImagickManager;

/**
 * Class PdfSlideshowStorageGateway.
 *
 * @package Drupal\pdf_slideshow\Gateway
 */
class PdfSlideshowStorageGateway {

  /**
   * Connection.
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected $connection;

  /**
   * File system.
   *
   * @var \Drupal\Core\File\FileSystem
   */
  protected $fileSystem;

  /**
   * PdfSlidesshowImagickManager.
   *
   * @var \Drupal\pdf_slideshow\Manager\PdfSlideshowImagickManager
   */
  protected $pdfSlideshowImagickManager;

  /**
   * PdfSlidesshowEntityGateway.
   *
   * @var \Drupal\pdf_slideshow\Gateway\PdfSlideshowEntityGateway
   */
  protected $pdfSlideshowEntityGateway;

  /**
   * PdfSlideshowStorageGateway constructor.
   *
   * @param \Drupal\Core\File\FileSystem $fileSystem
   *   Filesystem.
   * @param \Drupal\pdf_slideshow\Manager\PdfSlideshowImagickManager $pdfSlideshowImagickManager
   *   PdfSlideshowImagickManager.
   * @param \Drupal\pdf_slideshow\Gateway\PdfSlideshowEntityGateway $pdfSlideshowEntityGateway
   *   PdfSlideshowEntityGateway.
   */
  public function __construct(FileSystem $fileSystem, PdfSlideshowImagickManager $pdfSlideshowImagickManager, PdfSlideshowEntityGateway $pdfSlideshowEntityGateway) {

    $this->connection = Database::getConnection();
    $this->fileSystem = $fileSystem;
    $this->pdfSlideshowImagickManager = $pdfSlideshowImagickManager;
    $this->pdfSlideshowEntityGateway = $pdfSlideshowEntityGateway;
  }

  /**
   * FetchPdfImage.
   *
   * @param int|string $fid
   *   Pdf file id.
   *
   * @return array|null
   *   Pdf image file ids.
   */
  public function fetchPdfImageIds($fid) {
    return $this->fetchData($fid);
  }

  /**
   * Fetch data.
   *
   * @param mixed $pdfFileId
   *   Pdf file id.
   *
   * @return array
   *   Pdf file ids.
   */
  protected function fetchData($pdfFileId) {
    $results = $this->connection->select('pdf_slideshow_storage', 'pss')
      ->fields('pss', ['image_file_id'])
      ->condition('pdf_file_id', $pdfFileId)
      ->execute()
      ->fetchAll();
    $output = [];
    foreach ($results as $result) {
      $output[] = $result->image_file_id;
    }
    return $output;
  }

  /**
   * Persist images.
   *
   * @param int|string $width
   *   Width.
   * @param int|string $height
   *   Height.
   * @param int|string $limit
   *   Limit.
   *
   * @return mixed
   *   File image urls.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   * @throws \ImagickException
   */
  public function persistPdfImageIds($fileEntity, $width, $height, $limit) {
    if ($fileEntity && $fileEntity->getMimeType() == 'application/pdf') {
      $fileUri = $fileEntity->getFileUri();
      $fileUriArray = explode('/', $fileUri);
      $fileName = end($fileUriArray);
      $sourcePath = $this->fileSystem->realpath($fileUri);
      if ($sourcePath) {
        $imageUrls = $this->pdfSlideshowImagickManager->generateImage($sourcePath,
          $fileName . '.png',
          $width,
          $height,
          $limit);
        $fileEntityIds = $this->pdfSlideshowEntityGateway->createFileEntities($imageUrls);
        $this->saveDatas($fileEntity->id(), $fileEntityIds);
        return $this->pdfSlideshowEntityGateway->fetchPdfFileImageUrls($fileEntityIds);
      }
    }
    return NULL;
  }

  /**
   * Save file ids in database.
   *
   * @param int|string $pdfFileId
   *   PDF file id.
   * @param array $imageFileIds
   *   Image file ids.
   *
   * @throws \Exception
   */
  protected function saveDatas($pdfFileId, array $imageFileIds) {

    // Delete previous entries.
    $this->connection->delete('pdf_slideshow_storage')
      ->condition('pdf_file_id', $pdfFileId)
      ->execute();

    // Insert new entries.
    $query = $this->connection->insert('pdf_slideshow_storage')
      ->fields(['pdf_file_id', 'image_file_id']);
    foreach ($imageFileIds as $imageFileId) {
      $query->values([
        'pdf_file_id' => $pdfFileId,
        'image_file_id' => $imageFileId,
      ]);
    }
    $query->execute();
  }

  /**
   * Fetch all file ids.
   *
   * @return mixed
   *   Data from db.
   */
  public function fetchAll() {
    return $this->connection->select('pdf_slideshow_storage', 'pss')
      ->fields('pss', ['pdf_file_id', 'image_file_id'])
      ->execute()
      ->fetchAll();
  }

  /**
   * @param $filesIdList
   *
   * @return int
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function removeImages($filesIdList) {
    if (!empty($filesIdList)) {
      $this->connection->delete('pdf_slideshow_storage')
        ->condition('image_file_id', $filesIdList, 'IN')
        ->execute();
      return $this->pdfSlideshowEntityGateway->deleteFileEntities($filesIdList);
    }
    return 0;
  }

  /**
   * @param $fid
   *
   * @return mixed
   */
  public function fetchImageFileById($fid) {
    return $this->connection->select('pdf_slideshow_storage', 'pss')
      ->fields('pss', ['pdf_file_id', 'image_file_id'])
      ->condition('image_file_id', $fid)
      ->execute()
      ->fetchAll();
  }

}

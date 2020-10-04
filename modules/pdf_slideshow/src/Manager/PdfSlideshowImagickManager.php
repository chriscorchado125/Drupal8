<?php

namespace Drupal\pdf_slideshow\Manager;

use Drupal\Core\File\FileSystem;
use Imagick;

/**
 * Class PdfSlideshowImagickManager.
 *
 * @package Drupal\pdf_slideshow\Manager
 */
class PdfSlideshowImagickManager {

  /**
   * @var \Drupal\Core\File\FileSystem
   */
  protected $fileSystem;

  /**
   * PdfSlideshowImagickManager constructor.
   *
   * @param $fileSystem
   */
  public function __construct(FileSystem $fileSystem) {
    $this->fileSystem = $fileSystem;
  }

  /**
   * Generate images from PDF file.
   *
   * @param string $source
   *   Files source.
   * @param string $target
   *   Files target.
   * @param int $width
   *   Image width.
   * @param int $height
   *   Image height.
   * @param int $limit
   *   Tweet limit.
   *
   * @return array
   *   Files path.
   *
   * @throws \ImagickException
   */
  public function generateImage($source, $target, $width = 200, $height = 250, $limit = 3) {
    $target = dirname($source) . DIRECTORY_SEPARATOR . $target;
    $im = new Imagick($source);
    $im->setimageformat("png");
    $im->setImageAlphaChannel(Imagick::ALPHACHANNEL_REMOVE);
    $im->mergeImageLayers(Imagick::LAYERMETHOD_FLATTEN);
    $im->setImageBackgroundColor('white');
    $nbImage = $im->getNumberImages();
    $imageFilenames = [];
    for ($i = 0; $i < $nbImage && $i < $limit; $i++) {
      $im->setIteratorIndex($i);
      $im->thumbnailimage($width, $height);
      $im->writeImage(str_replace('.png', '-' . $i . '.png', $target));
      $imageFilenames[] = $im->getImageFilename();
    }
    $im->clear();
    $im->destroy();
    return $this->sanitizeUri($imageFilenames);
  }

  /**
   * @param array $fileNames
   *
   * @return array
   */
  protected function sanitizeUri(array $fileNames) {
    $privatePath = $this->fileSystem->realpath("private://");
    $publicPath = $this->fileSystem->realpath("public://");
    foreach ($fileNames as $index => $fileName) {
      if (strpos($fileName, $privatePath) !== false) {
        $fileName = str_replace($privatePath, 'private:/', $fileName);
      }
      if (strpos($fileName, $publicPath) !== false) {
        $fileName = str_replace($publicPath, 'public:/', $fileName);
      }
      $fileNames[$index] = $fileName;
    }
    return $fileNames;
  }

}

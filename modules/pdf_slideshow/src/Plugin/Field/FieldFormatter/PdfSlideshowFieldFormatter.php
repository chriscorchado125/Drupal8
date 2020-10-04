<?php

namespace Drupal\pdf_slideshow\Plugin\Field\FieldFormatter;

use Drupal\Component\Utility\Html;
use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Plugin implementation of the 'pdf_slideshow_field_formatter' formatter.
 *
 * @FieldFormatter(
 *   id = "pdf_slideshow_field_formatter",
 *   label = @Translation("PDF Slideshow"),
 *   field_types = {
 *     "file"
 *   }
 * )
 */
class PdfSlideshowFieldFormatter extends FormatterBase implements ContainerFactoryPluginInterface {

  /**
   * QueryStringFieldFormatter constructor.
   *
   * @param string $plugin_id
   *   The plugin_id for the formatter.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Field\FieldDefinitionInterface $field_definition
   *   The definition of the field to which the formatter is associated.
   * @param array $settings
   *   The formatter settings.
   * @param string $label
   *   The formatter label display setting.
   * @param string $view_mode
   *   The view mode.
   * @param array $third_party_settings
   *   Any third party settings settings.
   */
  public function __construct($plugin_id, $plugin_definition, FieldDefinitionInterface $field_definition, array $settings, $label, $view_mode, array $third_party_settings) {
    parent::__construct($plugin_id,
      $plugin_definition,
      $field_definition,
      $settings,
      $label,
      $view_mode,
      $third_party_settings);
  }

  /**
   * Create.
   *
   * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
   *   Container.
   * @param array $configuration
   *   Configuration.
   * @param string $plugin_id
   *   Plugin id.
   * @param mixed $plugin_definition
   *   Plugin definition.
   *
   * @return \Drupal\Core\Plugin\ContainerFactoryPluginInterface|\Drupal\pdf_slideshow\Plugin\Field\FieldFormatter\PdfSlideshowFieldFormatter
   *   Dependecy Injections.
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static($plugin_id,
      $plugin_definition,
      $configuration['field_definition'],
      $configuration['settings'],
      $configuration['label'],
      $configuration['view_mode'],
      $configuration['third_party_settings']);
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
        'width' => '200',
        'height' => '250',
        'nb_pages' => '1',
      ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    return [
      'width' => [
        '#type' => 'textfield',
        '#title' => $this->t('Image width'),
        '#default_value' => $this->getSetting('width'),
      ],
      'height' => [
        '#type' => 'textfield',
        '#title' => $this->t('Image height'),
        '#default_value' => $this->getSetting('height'),
      ],
      'nb_pages' => [
          '#type' => 'number',
          '#title' => $this->t('Number of pages'),
          '#default_value' => $this->getSetting('nb_pages'),
          '#min' => 1,
        ] + parent::settingsForm($form, $form_state),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];
    $summary[] = t('Image width') . ' : ' . $this->getSetting('width');
    $summary[] = t('Image height') . ' : ' . $this->getSetting('height');
    $summary[] = t('Number of pages') . ' : ' . $this->getSetting('nb_pages');
    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $pdfFileIds = [];
    if (!$items->isEmpty()) {
      foreach ($items as $item) {
        if ($item->entity && $item->entity->getMimeType() == 'application/pdf') {
          $pdfFileIds[] = $item->entity->id();
        }
        else {
          return [];
        }
      }

      return [
        '#theme' => 'pdf_slideshow_container',
        '#fids' => implode('_', $pdfFileIds),
        '#width' => $this->getSetting('width'),
        '#height' => $this->getSetting('height'),
        '#nbpages' => $this->getSetting('nb_pages'),
        '#attached' => [
          'library' => [
            'pdf_slideshow/pdf-slideshow',
          ],
        ],
      ];
    }
    return [];
  }

  /**
   * Generate the output appropriate for one field item.
   *
   * @param \Drupal\Core\Field\FieldItemInterface $item
   *   One field item.
   *
   * @return string
   *   The textual output generated.
   */
  protected function viewValue(FieldItemInterface $item) {
    return nl2br(Html::escape($item->value));
  }

}

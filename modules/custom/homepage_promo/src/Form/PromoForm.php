<?php
/**
 * @file
 * Contains\Drupal\homepage_promo\Form\PromoForm
 */

 namespace Drupal\homepage_promo\Form;

 use Drupal\Core\Database\Database;
 use Drupal\Core\Form\FormBase;
 use Drupal\Core\Form\FormStateInterface;

/**
 * Provides promotion form
 */
class PromoForm extends FormBase{

  /**
   * (@inheridoc)
   */
  public function getFormId(){
    return 'hp_promo';
  }

  /**
   * (@inheridoc)
   */
  public function buildForm(array $form, FormStateInterface $form_state){

    $form['title'] = array(
      '#title' => t('Title'),
      '#type' => 'textfield',
      '#size' => 25,
      '#description' => t('Make it short and to the point'),
    );

    $form['description'] = array(
      '#title' => t('Description'),
      '#type' => 'textarea',
      '#size' => 25,
      '#description' => t('Should be descriptive and have a call to action'),
    );

    $node = \Drupal::routeMatch()->getParameter('node');
    if ($node instanceof \Drupal\node\NodeInterface) {
      $nid = $node->id();
    }

    $form['nid'] = array(
      '#type' => 'hidden',
      '#value' => $nid,
    );

    $form['submit'] = array(
      '#type' => 'submit',
      '#value' => t('Save Promotion')
    );

    return $form;
  }

  /**
   *(@inheridoc)
  */
  public function validateForm(array &$form, FormStateInterface $form_state){

   if(!$form_state->getValue('title')){
     $form_state->setErrorByName('title', t('Title is required'));
   }

   if(!$form_state->getValue('description')){
     $form_state->setErrorByName('description', t('Description is required'));
   }
  }

  /**
   *(@inheridoc)
  */
  public function submitForm(array &$form, FormStateInterface $form_state){

    $msg = '';

    $user = \Drupal\user\Entity\User::load(\Drupal::currentUser()->id());

    // if there is a promotion update it, otherwise insert it
    if(getPromotion()){

      db_update('homepage_promo')
      ->fields(array(
        'title' => $form_state->getValue('title'),
        'description' => $form_state->getValue('description'),
        'uid' => $user->id(),
        'updated' => time()
      ))
      ->execute();

      $msg = 'Updated';

    }else{

      db_insert('homepage_promo')
      ->fields(array(
        'title' => $form_state->getValue('title'),
        'description' => $form_state->getValue('description'),
        'nid' => $form_state->getValue('nid'),
        'uid' => $user->id(),
        'created' => time(),
        'updated' => time()
      ))
      ->execute();

      $msg = 'Added';
    }

    drupal_set_message(t('Promotion ' . $msg));
  }
}
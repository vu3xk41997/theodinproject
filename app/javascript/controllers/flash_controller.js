import { Controller } from '@hotwired/stimulus';

export default class AdminFlashController extends Controller {

  static targets = ['close']

  setCookie() {
    const flashData = this.closeTarget;
    const messageId = flashData.dataset.id;
    const messageExpiration = flashData.dataset.expire;
    this.setAdminFlashCookie(messageId, 'disabled', messageExpiration);
  }

  setAdminFlashCookie(name, value, date) {
    const cookieDate = this.convertToCookieDate(date);
    document.cookie = `admin_flash_${name}=${value}; expires=${cookieDate}; path=/`
  }

  convertToCookieDate(date) {
    const parts = date.split('-');
    const day = parts[2].split(' ');
    const jsDate = new Date(parts[0], parts[1] - 1, day[0]);
    const cookieDate = jsDate.toUTCString();
    return cookieDate;
  }     
}

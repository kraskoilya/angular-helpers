import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkGenerator',
})
export class LinkGeneratorPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return this.linkify(value);
    }
    return null;
  }

  private linkify(plainText): string {
    const regexA = /<a[^>]*>\/?[^>]*<\/a>/;
    // added this check bacause ckeditor automatically generates a link and this pipe generates another link, finally we watch two links
    if (!regexA.test(plainText)) {
      let replacedText;
      let replacePattern1;
      let replacePattern2;
      let replacePattern3;

      // URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9А-Яа-яёË+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = plainText.replace(
        replacePattern1,
        '<a href="$1" target="_blank">$1</a>'
      );

      // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(
        replacePattern2,
        '$1<a href="http://$2" target="_blank">$2</a>'
      );

      // Change email addresses to mailto:: links.
      replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(
        replacePattern3,
        '<a href="mailto:$1">$1</a>'
      );

      return replacedText;
    } else {
      return plainText;
    }
  }
}

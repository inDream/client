import Ember from 'ember';
import DS from 'ember-data';
import sortBy from '../utils/sort-by';

var attr = DS.attr;
var hasMany = DS.hasMany;

export default DS.Model.extend({
  name: attr('string'),
  description: attr('string'),
  repositoryUrl: attr('string'),
  latestVersionDate: attr('date'),
  license: attr('string'),
  isDeprecated: attr('boolean'),
  note: attr('string'),
  renderedNote: attr('string'),
  isOfficial: attr('boolean'),
  isCliDependency: attr('boolean'),
  isHidden: attr('boolean'),
  hasInvalidGithubRepo: attr('boolean'),
  isNewAddon: attr('boolean'),
  score: attr('number'),
  openIssues: attr('number'),
  forks: attr('number'),
  contributors: attr('array'),
  firstCommitDate: attr('date'),
  latestCommitDate: attr('date'),
  lastMonthDownloads: attr('number'),
  stars: attr('number'),
  isTopDownloaded: attr('boolean'),
  isTopStarred: attr('boolean'),
  categories: hasMany('category', {async: true}),
  keywords: hasMany('keyword', {async: true}),
  versions: hasMany('version', {async: true}),
  maintainers: hasMany('maintainer'),
  reviews: hasMany('review', {async: true}),
  sortedVersions: sortBy('versions', 'released:desc'),
  latestVersion: Ember.computed.alias('sortedVersions.firstObject'),
  oldestVersion: Ember.computed.alias('sortedVersions.lastObject'),
  hasGithubData: function(){
    return !this.get('hasInvalidGithubRepo') && this.get('firstCommitDate');
  }.property('hasInvalidGithubRepo', 'firstCommitDate'),
  npmUrl: function(){
    return `https://www.npmjs.com/package/${this.get('name')}`;
  }.property('name')
});

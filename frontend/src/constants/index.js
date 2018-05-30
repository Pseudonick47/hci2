import { TEXTS, TAB_VALUES } from './help';

const ENVIRONMENTS = {
  'localhost': 'dev',
  'project.local  ': 'dev',
  'stagebackend.com': 'stage',
};

const BACKEND_HOSTNAMES = {
  'dev': 'http://localhost:1337',
  'stage': 'http://stagebackend.com',
};

export {
  ENVIRONMENTS,
  BACKEND_HOSTNAMES,
  TEXTS,
  TAB_VALUES,
};
